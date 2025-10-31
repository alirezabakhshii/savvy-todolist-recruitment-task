import React from "react";
import { ItemTypes } from "../../../Types/item.types";
import { useModal } from "../../../Store/modules/modalSlice";
import { useTodo } from "../../../Store/modules/todoSlice";

export type ListItemProps = {
  item: ItemTypes;
};

export const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const { dispatchOpenModal } = useModal();
  const { dispatchDeleteTodo } = useTodo();

  const onEditItem = () => {
    dispatchOpenModal({
      name: "TodoDialogModal",
      modalProps: { itemToEdit: item },
    });
  };

  const onDeleteItem = () => {
    if (item.id) dispatchDeleteTodo(item.id);
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-xl">
      <div>
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.subtitle}</p>
        <span className="text-xs text-gray-400">{item.createdAt}</span>
      </div>
      <div className="flex gap-2">
        <button onClick={onEditItem} className="text-blue-500">
          Edit
        </button>
        <button onClick={onDeleteItem} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
};
