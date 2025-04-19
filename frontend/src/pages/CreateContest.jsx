import React, { useState } from "react";
import { createContest } from "../utils/api";
import { getToken } from "../utils/auth";
import "../styles/CreateContest.css";
import contestIllustration from "../assets/giphy.gif";
import { FiX, FiPlus, FiAward, FiBook, FiMail } from "react-icons/fi";

const CreateContest = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [qTitle, setQTitle] = useState("");
  const [qDesc, setQDesc] = useState("");
  const [qInput, setQInput] = useState("");
  const [qOutput, setQOutput] = useState("");

  const handleAddQuestion = () => {
    if (!qTitle || !qDesc || !qInput || !qOutput) {
      alert("Please fill in all question fields before adding.");
      return;
    }

    const newQuestion = {
      title: qTitle,
      description: qDesc,
      sample_input: qInput,
      sample_output: qOutput
    };

    setQuestions((prev) => [...prev, newQuestion]);

    // Animate
    document.querySelector(".questions-list")?.classList.add("animate-pulse");
    setTimeout(() => {
      document.querySelector(".questions-list")?.classList.remove("animate-pulse");
    }, 500);

    // Clear current inputs
    setQTitle("");
    setQDesc("");
    setQInput("");
    setQOutput("");
  };

  const handleRemoveQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (questions.length === 0) {
      alert("Please add at least one question before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = getToken();
      await createContest(token, {
        teacher_email: email,
        title,
        description: desc,
        questions
      });

      setSuccess(true);

      // Reset all fields
      setTitle("");
      setDesc("");
      setEmail("");
      setQuestions([]);
      setQTitle("");
      setQDesc("");
      setQInput("");
      setQOutput("");

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Error creating contest: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-contest-container">
      <div className="header-section">
        <div className="header-content">
          <h1 className="create-contest-title">
            <FiAward className="title-icon" /> Create New Contest
          </h1>
          <p className="subtitle">
            Design engaging competitions for your students with our intuitive contest builder
          </p>
        </div>
        <div className="illustration">
          <img src={contestIllustration} alt="Contest creation" />
        </div>
      </div>

      {success && (
        <div className="success-message">
          <div className="success-content">
            <svg className="success-icon" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
            <span>Contest created successfully!</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contest-form">
        <div className="form-card">
          <div className="form-group">
            <label className="form-label">
              <FiBook className="input-icon" /> Contest Title
            </label>
            <input
              type="text"
              placeholder="Enter contest title"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FiBook className="input-icon" /> Description
            </label>
            <textarea
              placeholder="Provide a clear description of the contest rules and objectives..."
              rows="4"
              className="form-textarea"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FiMail className="input-icon" /> Teacher Email
            </label>
            <input
              type="email"
              placeholder="teacher@example.com"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-card">
          <h3 className="section-title">
            <FiPlus className="section-icon" /> Add Questions
          </h3>

          <input
            type="text"
            placeholder="Question Title"
            className="form-input"
            value={qTitle}
            onChange={(e) => setQTitle(e.target.value)}
          />
          <textarea
            placeholder="Question Description"
            className="form-textarea"
            rows="3"
            value={qDesc}
            onChange={(e) => setQDesc(e.target.value)}
          />
          <input
            type="text"
            placeholder="Sample Input"
            className="form-input"
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Sample Output"
            className="form-input"
            value={qOutput}
            onChange={(e) => setQOutput(e.target.value)}
          />

          <button type="button" onClick={handleAddQuestion} className="submit-btn mt-2">
            Add Question
          </button>
        </div>

        {questions.length > 0 && (
          <div className="form-card questions-list">
            <h3 className="section-title">
              <FiBook className="section-icon" /> Contest Questions
            </h3>
            <div className="questions-grid">
              {questions.map((q, i) => (
                <div key={i} className="question-card">
                  <div className="question-content">
                    <span className="question-number">Q{i + 1}</span>
                    <span className="question-text">{q.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(i)}
                    className="remove-question-btn"
                    aria-label="Remove question"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            disabled={isSubmitting || questions.length === 0}
            className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Creating Contest...
              </>
            ) : (
              "Publish Contest"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContest;
