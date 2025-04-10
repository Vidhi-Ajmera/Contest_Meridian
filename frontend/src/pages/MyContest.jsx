import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

const MyContests = ({ token }) => {
    const [contests, setContests] = useState([]);
  
    useEffect(() => {
      fetchContests();
    }, []);
  
    const fetchContests = async () => {
      const res = await axios.get(`${API_URL}/contest/teacher/mycontest`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContests(res.data);
    };
  const toggleStatus = async (id, isActive) => {
    const endpoint = isActive ? "end" : "start";
    await axios.post(`${API_URL}/contest/${endpoint}/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchContests();
  };

  const viewSubmissions = async (id) => {
    const res = await axios.get(`${API_URL}/submissions/by-contest/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert(JSON.stringify(res.data, null, 2)); // Display in a modal or proper UI ideally
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">My Contests</h2>
      {contests.map((contest) => (
        <div key={contest.id} className="border p-4 rounded shadow-sm">
          <h3 className="text-lg font-semibold">{contest.title}</h3>
          <p>{contest.description}</p>
          <p>Status: <span className={contest.is_active ? "text-green-600" : "text-red-600"}>{contest.is_active ? "Active" : "Inactive"}</span></p>
          <div className="space-x-2 mt-2">
            <button
              onClick={() => toggleStatus(contest.id, contest.is_active)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              {contest.is_active ? "End Contest" : "Start Contest"}
            </button>
            <button
              onClick={() => viewSubmissions(contest.id)}
              className="px-3 py-1 bg-gray-700 text-white rounded"
            >
              View Submissions
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyContests;
