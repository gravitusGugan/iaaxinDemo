import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useParams, Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function GroupTodos() {
  const { userId } = useParams();
  const { state, addTodo } = useContext(GlobalContext);
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (todo.trim()) {
      addTodo(userId, { id: uuidv4(), text: todo, completed: false });
      setTodo("");
      setError("");
    } else {
      setError("Please enter a todo item.");
    }
  };

  const handleLinkClick = (todoId) => {
    // Store the checkbox data related to the selected todo
    localStorage.setItem(
      "currentCheckboxes",
      JSON.stringify(state.checkbox[todoId] || [])
    );
    // Navigate to the specific todo's checkbox view
    navigate(`/group/${userId}/todo/${todoId}/checkbox`);
  };

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">Back to Home</Link>
      <h2>Group Todos for User ID: {userId}</h2>
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter todo"
        style={{ marginRight: 10 }}
      />
      <button onClick={handleSubmit}>Add Todo</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {state.todos[userId]?.map((todoItem) => (
          <li key={todoItem.id}>
            <Link
              to={`/group/${userId}/todo/${todoItem.id}/checkbox`}
              onClick={() => handleLinkClick(todoItem.id)}
            >
              {todoItem.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupTodos;
