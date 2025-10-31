import React, { useState, useEffect } from "react";
import { useTodo } from "../../../Store/modules/todoSlice";
import { useModal } from "../../../Store/modules/modalSlice";

export const Form: React.FC = () => {
  const { modalProps, dispatchCloseModal } = useModal();
  const { itemToEdit } = modalProps || {};
  const [title, setTitle] = useState("");
  const { dispatchAddTodo, dispatchEditTodo } = useTodo();
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setSubtitle(itemToEdit.subtitle);
    } else {
      setTitle("");
      setSubtitle("");
    }
  }, [itemToEdit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required!");
    if (itemToEdit) {
      dispatchEditTodo({ id: itemToEdit.id, title, subtitle });
    } else {
      dispatchAddTodo({ title, subtitle });
    }
    dispatchCloseModal();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 rounded"
      />
      <input
        type="text"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        placeholder="Subtitle"
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {itemToEdit ? "Update" : "Create"}
      </button>
    </form>
  );
};
