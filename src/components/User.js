import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function UserList() {
  const { state, addUser } = useContext(GlobalContext);
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim() !== "") {
      addUser({ id: uuidv4(), name });
      setName("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">Back to Home</Link>
      <h2>User Management</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
        style={{ marginRight: 10 }}
      />
      <button onClick={handleSubmit}>Add User</button>
      <ul>
        {state.users.map((user) => (
          <li key={user.id}>
            <Link to={`/group/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
