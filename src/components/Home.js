import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to the Group To-Do App</h1>
      <Link to="/user" style={{ marginRight: 10 }}>
        Manage Users
      </Link>
    </div>
  );
}

export default Home;
