import React from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../utils/auth";

const Dashboard = ({ userRole }) => {
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="flex gap-4">
        {userRole === "teacher" && (
          <>
            <button
              onClick={() => navigate("/create-contest")}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Create Contest
            </button>
            <button
              onClick={() => navigate("/my-contests")}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Created Contests
            </button>
          </>
        )}
        {userRole === "student" && (
          <button
            onClick={() => navigate("/participate")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Participate
          </button>
        )}
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;