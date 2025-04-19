import React, { useState, useEffect } from "react";
import { getToken } from "../utils/auth";
import "../styles/SubmissionViewer.css";

const SubmissionViewer = ({ contestId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/submissions/${contestId}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const data = await res.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [contestId]);

  const getStatusClass = (status) => {
    if (status === 'Accepted') return 'status-accepted';
    if (status === 'Wrong Answer') return 'status-wrong';
    return 'status-pending';
  };

  return (
    <div className="submission-container">
      <h3 className="submission-title">Submissions</h3>

      {loading ? (
        <div className="submission-loading">
          <div className="submission-spinner"></div>
        </div>
      ) : submissions.length === 0 ? (
        <div className="submission-empty">
          <p>No submissions have been received yet.</p>
        </div>
      ) : (
        <div className="submission-list">
          {submissions.map((s, idx) => (
            <div key={idx} className="submission-item">
              <div className="submission-meta">
                <div>
                  <span className="submission-label">User:</span>
                  <span className="submission-value">{s.student_email}</span>
                </div>
                <div>
                  <span className="submission-label">Status:</span>
                  <span className={`submission-status ${getStatusClass(s.status)}`}>
                    {s.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="submission-code-label">Code:</p>
                <pre className="submission-code">{s.code}</pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionViewer;