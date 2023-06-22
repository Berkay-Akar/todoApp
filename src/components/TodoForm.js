import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input) return; // Boş todo eklemesini engelle

    try {
      if (props.edit) {
        // Todo güncelleme isteği
        await axios.put(`http://localhost:3001/todos/${props.edit.id}`, {
          description: input,
        });
        // Güncellenmiş todoyu props.onSubmit ile ana bileşene iletebilirsiniz
        props.onSubmit({ id: props.edit.id, description: input });
      } else {
        // Yeni todo ekleme isteği
        const response = await axios.post("http://localhost:3001/todos", {
          description: input,
        });
        // Eklenen todoyu props.onSubmit ile ana bileşene iletebilirsiniz
        props.onSubmit(response.data);
      }
    } catch (error) {
      console.error("TodoForm handleSubmit Error:", error);
    }

    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="description"
            ref={inputRef}
            className="todo-input edit"
          />
          <button type="submit" className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="description"
            className="todo-input"
            ref={inputRef}
          />
          <button type="submit" className="todo-button">
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
