import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { TodoList } from "../Pages/TodoList/TodoList";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
};
