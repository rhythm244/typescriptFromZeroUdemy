import React from "react";
import "./TodoList.css";

interface TodoListProps {
  items: { id: string; text: string }[];
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ items, onDeleteTodo }) => {
  return (
    <ul>
      {items.map((todo) => {
        return (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={onDeleteTodo.bind(null, todo.id)}>DELETE</button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
