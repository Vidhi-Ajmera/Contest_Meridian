import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import "../styles/MyContest.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000";

const MyContests = () => {
  const navigate = useNavigate();
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    fetchContests();
  }, []);
  const handleCreateContest = () => {
    navigate("/create-contest"); // Navigate to the Create Contest page
  };
  const fetchContests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/contest/teacher/mycontest`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContests(res.data);
    } catch (error) {
      console.error("Failed to fetch contests:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, isActive) => {
    const endpoint = isActive ? "end" : "start";
    try {
      await axios.post(
        `${API_URL}/contest/${endpoint}/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchContests();
    } catch (error) {
      console.error(`Failed to ${isActive ? "end" : "start"} contest:`, error);
    }
  };

  const viewSubmissions = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/submissions/by-contest/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // In a real app, you'd display this in a modal component
      alert(JSON.stringify(res.data, null, 2));
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <svg
          className="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="contests-container">
      <div className="page-header">
        <h1 className="page-title">My Contests</h1>
        <button className="btn btn-primary" onClick={handleCreateContest}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 btn-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Create New Contest
        </button>
      </div>

      {contests.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <p className="empty-state-text">You haven't created any contests yet</p>
        </div>
      ) : (
        <div className="contests-grid">
          {contests.map((contest) => (
            <div key={contest.id} className="contest-card">
              <div className="contest-header">
                <h3 className="contest-title">{contest.title}</h3>
              </div>
              <div className="contest-body">
                <p className="contest-description">{contest.description}</p>
                <div className="contest-meta">
                  <div className="contest-status">
                    <span
                      className={contest.is_active ? "status-indicator status-active" : "status-indicator status-inactive"}
                    ></span>
                    <span
                      className={contest.is_active ? "status-text-active" : "status-text-inactive"}
                    >
                      {contest.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="contest-date">
                    {contest.created_at && new Date(contest.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="contest-actions">
                  <button
                    onClick={() => toggleStatus(contest.id, contest.is_active)}
                    className={contest.is_active ? "btn btn-danger" : "btn btn-primary"}
                  >
                    {contest.is_active ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 btn-icon"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                            clipRule="evenodd"
                          />
                        </svg>
                        End Contest
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 btn-icon"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Start Contest
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => viewSubmissions(contest.id)}
                    className="btn btn-secondary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 btn-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View Submissions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyContests;