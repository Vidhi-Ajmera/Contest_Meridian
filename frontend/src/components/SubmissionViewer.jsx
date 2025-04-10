import React, { useState, useEffect } from "react";
import { getToken } from "../utils/auth";

const SubmissionViewer = ({ contestId }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await fetch(`http://localhost:8000/submissions/${contestId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await res.json();
      setSubmissions(data);
    };

    fetchSubmissions();
  }, [contestId]);

  return (
    <div className="p-4 border rounded mt-6">
      <h3 className="text-lg font-bold mb-2">Submissions</h3>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        submissions.map((s, idx) => (
          <div key={idx} className="mb-4 border-b pb-2">
            <p><strong>User:</strong> {s.student_email}</p>
            <p><strong>Code:</strong></p>
            <pre className="bg-gray-100 p-2 rounded">{s.code}</pre>
            <p><strong>Status:</strong> {s.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SubmissionViewer;
