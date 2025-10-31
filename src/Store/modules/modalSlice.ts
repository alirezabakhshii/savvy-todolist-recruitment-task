import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/useStore";

export type ModalState = {
  name: string;
  modalProps: any;
};

export const initialState = {
  name: "",
  modalProps: {},
} as ModalState;

export const modalSlice = createSlice({
  name: "modal",
  reducers: {
    closeModal: (state) => {
      state.name = "";
      state.modalProps = {};
    },
    openModal: (
      state,
      action: PayloadAction<{ name: string; modalProps?: any }>,
    ) => {
      state.name = action.payload.name;
      if (action.payload.modalProps) {
        state.modalProps = action.payload.modalProps;
      }
    },
  },
  initialState: initialState,
});

export const useModal = () => {
  const { name, modalProps } = useAppSelector((state) => state.modal) || {};
  const dispatch = useAppDispatch();

  const dispatchCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const dispatchOpenModal = useCallback(
    ({ name, modalProps }: { name: string; modalProps?: any }) => {
      dispatch(openModal({ name, modalProps }));
    },
    [dispatch],
  );

  return { name, modalProps, dispatchCloseModal, dispatchOpenModal };
};

export const { closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;
