import React, { useState } from "react";

const QuestionForm = ({ addQuestion }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");

  const handleAdd = () => {
    addQuestion({
      title,
      description,
      sample_input: sampleInput,
      sample_output: sampleOutput,
    });
    setTitle("");
    setDescription("");
    setSampleInput("");
    setSampleOutput("");
  };

  return (
    <div className="border p-4 rounded mb-4">
      <h3 className="font-bold mb-2">Add Question</h3>
      <input
        type="text"
        placeholder="Title"
        className="w-full mb-2 px-3 py-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="w-full mb-2 px-3 py-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Sample Input"
        className="w-full mb-2 px-3 py-2 border rounded"
        value={sampleInput}
        onChange={(e) => setSampleInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Sample Output"
        className="w-full mb-2 px-3 py-2 border rounded"
        value={sampleOutput}
        onChange={(e) => setSampleOutput(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleAdd}
      >
        Add Question
      </button>
    </div>
  );
};

export default QuestionForm;
