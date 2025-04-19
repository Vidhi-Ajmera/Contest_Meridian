import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ParticipateContest.css";

const API_URL = "http://localhost:8000";

export default function ParticipateContest() {
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [code, setCode] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [language, setLanguage] = useState("python");

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/contest/active`);
        setContests(res.data);
      } catch (err) {
        setError("Failed to load contests. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const handleSubmit = async () => {
    if (!studentEmail || !questionTitle || !code) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const payload = {
        contest_id: selectedContest.id,
        question_title: questionTitle,
        code,
        language,
      };

      await axios.post(
        `${API_URL}/submissions/submit?student_email=${studentEmail}`,
        payload
      );
      setSuccess("Your code has been submitted successfully!");
      setCode("");
      setQuestionTitle("");
    } catch (err) {
      setError(
        `Submission failed: ${err.response?.data?.message || "Unknown error"}`
      );
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedQuestion = selectedContest?.questions?.find(
    (q) => q.title === questionTitle
  );

  return (
    <div className="participate-container">
      <h1 className="participate-title">Coding Contests</h1>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : contests.length === 0 ? (
        <div className="no-contests">
          <p>No active contests available at the moment.</p>
        </div>
      ) : (
        <div className="contests-grid">
          {contests.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setSelectedContest(c);
                setQuestionTitle("");
              }}
              className={`contest-card ${selectedContest?.id === c.id ? "active" : ""
                }`}
            >
              <h3 className="contest-title">{c.title}</h3>
              <div className="contest-code">{c.contest_code}</div>
            </div>
          ))}
        </div>
      )}

      {selectedContest && (
        <div className="submission-form">
          <h2 className="form-title">
            Submit Solution:{" "}
            <span className="form-title-highlight">
              {selectedContest.title}
            </span>
          </h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="your.email@example.com"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="question" className="form-label">
                Question Title
              </label>
              <select
                id="question"
                className="form-input"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
              >
                <option value="">Select a question</option>
                {selectedContest?.questions?.map((q) => (
                  <option key={q.title} value={q.title}>
                    {q.title}
                  </option>
                ))}
              </select>
            </div>

            {selectedQuestion && (
              <div className="question-details">
                <div className="question-section">
                  <h3 className="question-heading">Description</h3>
                  <p className="question-text">
                    {selectedQuestion.description}
                  </p>
                </div>
                <div className="question-section">
                  <h3 className="question-heading">Sample Input</h3>
                  <pre className="question-code">
                    {selectedQuestion.sample_input}
                  </pre>
                </div>
                <div className="question-section">
                  <h3 className="question-heading">Sample Output</h3>
                  <pre className="question-code">
                    {selectedQuestion.sample_output}
                  </pre>
                </div>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="language" className="form-label">
                Programming Language
              </label>
              <select
                id="language"
                className="form-input"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="code" className="form-label">
                Solution Code
              </label>
              <textarea
                id="code"
                className="code-textarea"
                placeholder="# Write your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="submit-button"
              >
                {submitting ? (
                  <span className="button-spinner">
                    <span className="button-spinner-icon"></span>
                    Submitting...
                  </span>
                ) : (
                  "Submit Solution"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
