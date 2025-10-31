import React, { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "../../Store/modules/modalSlice";

export type ModalProps = {
  modalName: string;
  children: ReactNode;
  modalClassName?: string;
  preventToClose?: boolean;
  containerClassName?: string;
};

export const Modal: React.FC<ModalProps> = ({
  modalName,
  children,
  modalClassName = "",
  preventToClose,
  containerClassName = "overflow-y-auto",
}) => {
  const { name, dispatchCloseModal } = useModal();
  const open = name === modalName;

  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    if (!preventToClose) dispatchCloseModal();
  };

  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const prev = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = prev.overflow;
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (!open || preventToClose) return;
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [open, preventToClose]);

  const modalRoot =
    document.getElementById("modal-root") ||
    (() => {
      const el = document.createElement("div");
      el.id = "modal-root";
      document.body.appendChild(el);
      return el;
    })();

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) handleClose();
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          onClick={onOverlayClick}
          className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`relative  max-h-[90vh] mx-auto overflow-hidden ${modalClassName} pointer-events-auto`}
          >
            <div
              className={`w-full flex-1 min-h-0 overflow-y-auto hide-scrollbar bg-white ${containerClassName} rounded-[5px]`}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot,
  );
};
