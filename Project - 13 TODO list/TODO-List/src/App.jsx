import React, { useEffect, useState } from 'react'
import './App.css'
import NewTodoForm from './NewTodoForm';
import TodoList from './TodoList';

export default function App() {

  const [todos, setTodos] = useState(() => {
      const data = localStorage.getItem('ITEMS');
      if (data == null) return [] 

      return JSON.parse(data);
  });

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos));
  }
    , [todos]);

  function addTodos(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: Math.random(), title: title, completed: false }
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodos} />
      <h1 className="header">TODO List</h1>
      <TodoList todos = {todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  );
}