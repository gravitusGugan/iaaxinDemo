import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import GroupTodos from "./components/GroupTodos";
import UserList from "./components/User";
import CheckboxTodo from "./components/CheckboxTodo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/group/:userId" element={<GroupTodos />} />
        <Route path="/group/:userId/todo/:todoId/checkbox" element={<CheckboxTodo />} />
      </Routes>
    </Router>
  );
}

export default App;
