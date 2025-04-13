import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateContest from "./pages/CreateContest";
import Participate from "./pages/ParticipateContest";
import MyContests from "./pages/MyContest";
import { getToken } from "./utils/auth";
import { jwtDecode } from "jwt-decode";

function App() {
  const token = getToken();
  const userRole = token ? jwtDecode(token).role : null; 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
        <Route path="/create-contest" element={<CreateContest />} />
        <Route path="/participate" element={<Participate />} />
        <Route path="/my-contests" element={<MyContests />} />
      </Routes>
    </Router>
  );
}

export default App;
