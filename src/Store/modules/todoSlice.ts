import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemTypes } from "../../Types/item.types";
import { useAppDispatch, useAppSelector } from "../../Hooks/useStore";
import { useCallback } from "react";
interface ItemsState {
  list: ItemTypes[];
}

const initialState: ItemsState = {
  list: [],
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ title: string; subtitle: string }>,
    ) => {
      const newItem: ItemTypes = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        subtitle: action.payload.subtitle,
        createdAt: new Date().toISOString(),
      };
      state.list.push(newItem);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; title: string; subtitle: string }>,
    ) => {
      const index = state.list.findIndex((i) => i.id === action.payload.id);
      if (index > -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions || {};
export default todoSlice.reducer;

export const useTodo = () => {
  const { list } = useAppSelector((state) => state.todoSlice);
  const dispatch = useAppDispatch();

  const dispatchAddTodo = useCallback(
    (data: ItemTypes) => {
      dispatch(addTodo(data));
    },
    [dispatch],
  );

  const dispatchEditTodo = useCallback(
    (data: { id: string; title: string; subtitle: string }) => {
      dispatch(updateTodo(data));
    },
    [dispatch],
  );

  const dispatchDeleteTodo = useCallback(
    (data: string) => {
      dispatch(deleteTodo(data));
    },
    [dispatch],
  );

  return { list, dispatchDeleteTodo, dispatchEditTodo, dispatchAddTodo };
};
