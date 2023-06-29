import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import axios from "axios";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/todos");
      setTodos(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async (todo) => {
    try {
      setTodos([...todos, todo]);
    } catch (err) {
      console.log(err);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const updateTodo = async (todoId, newValue) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/todos/${todoId}`,
        newValue
      );
      setTodos(
        todos.map((todo) => (todo.id === todoId ? response.data : todo))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // const completeTodo = async (id) => {
  //   try {
  //     const todoToUpdate = todos.find((todo) => todo.id === id);
  //     const updatedTodo = {
  //       ...todoToUpdate,
  //       isComplete: !todoToUpdate.isComplete,
  //     };
  //     const response = await axios.put(
  //       `http://localhost:3001/todos/${id}`,
  //       updatedTodo
  //     );

  //     setTodos(
  //       todos.map((todo) =>
  //         todo.id === id ? { ...response.data } : { ...todo }
  //       )
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      <h1>What's the plan for today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        //completedTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}
export default TodoList;
