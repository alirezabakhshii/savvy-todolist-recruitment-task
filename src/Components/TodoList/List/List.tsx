import React from "react";
import { ItemTypes } from "../../../Types/item.types";
import { ListItem } from "../ListItem/ListItem";

export type ListProps = {
  items: ItemTypes[];
};

export const List: React.FC<ListProps> = (props) => {
  const { items } = props;
  return (
    <div className="flex flex-col gap-3">
      {items.length === 0 ? (
        <p className="text-gray-500">No items yet.</p>
      ) : (
        items.map((item) => <ListItem key={item.id} item={item} />)
      )}
    </div>
  );
};
