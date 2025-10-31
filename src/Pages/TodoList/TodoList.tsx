import React from "react";
import { useModal } from "../../Store/modules/modalSlice";
import { useTodo } from "../../Store/modules/todoSlice";
import { List } from "../../Components/TodoList/List/List";

export const TodoList: React.FC = () => {
  const { dispatchOpenModal } = useModal();
  const { list } = useTodo();

  return (
    <div className="h-screen flex justify-center items-center">
      <header className="flex fixed bg-white w-full left-0 top-0 justify-between items-center py-6 px-[32px]">
        <h1 className="text-2xl font-bold">TodoList</h1>
        <button
          onClick={() => {
            dispatchOpenModal({ name: "TodoDialogModal" });
          }}
          className="bg-green-600 text-white px-3 py-2 rounded-lg"
        >
          + Create
        </button>
      </header>
      <div className="lg:w-[700px] relative lg:h-[500px] w-[90%] h-[70%] shadow-xl overflow-y-auto bg-[white] px-[32px] py-[24px]">
        <List items={list} />
      </div>
    </div>
  );
};
