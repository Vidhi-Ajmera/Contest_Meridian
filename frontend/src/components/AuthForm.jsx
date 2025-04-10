import React, { useState } from "react";
import { login, signup } from "../utils/api";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "signup") {
      const res = await signup({ email, username, password, role });
      alert("Signup successful");
      navigate("/login");
    } else {
      const res = await login({ username: email, password });
      if (res.access_token) {
        saveToken(res.access_token);
        navigate("/dashboard");
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">{mode === "signup" ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {mode === "signup" && (
          <>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <select
              className="w-full px-4 py-2 border rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </>
        )}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {mode === "signup" ? "Sign Up" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
