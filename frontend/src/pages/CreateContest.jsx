import React, { useState } from "react";
import { createContest } from "../utils/api";
import { getToken } from "../utils/auth";
import QuestionForm from "../components/QuestionForm";

const CreateContest = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState(""); // temp: email input for testing
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    const res = await createContest(token, {
      teacher_email: email,
      title,
      description: desc,
      questions
    });
    alert("Contest created");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Create Contest</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Contest Title"
          className="w-full px-4 py-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full px-4 py-2 border rounded"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="email"
          placeholder="Teacher Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">
          Create
        </button>
      </form>
      <QuestionForm addQuestion={handleAddQuestion} />
      {questions.length > 0 && (
        <div className="mb-4">
            <h4 className="font-semibold">Added Questions:</h4>
            <ul className="list-disc ml-6">
            {questions.map((q, i) => (
                <li key={i}>{q.title}</li>
            ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default CreateContest;
