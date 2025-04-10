import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateContest from "./pages/CreateContest";
import Participate from "./pages/ParticipateContest";
import MyContests from "./pages/MyContest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-contest" element={<CreateContest />} />
        <Route path="/participate" element={<Participate />} />
        <Route path="/my-contests" element={<MyContests />} />
      </Routes>
    </Router>
  );
}

export default App;
