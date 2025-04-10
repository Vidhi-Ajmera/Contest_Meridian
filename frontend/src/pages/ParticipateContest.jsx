import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

export default function ParticipateContest() {
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [code, setCode] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/contest/active`)
      .then(res => setContests(res.data))
      .catch(console.error);
  }, []);

  const handleSubmit = async () => {
    const payload = {
      contest_id: selectedContest.id,
      question_title: questionTitle,
      code,
      language: "python"
    };
    await axios.post(`${API_URL}/submissions/submit?student_email=${studentEmail}`, payload);
    alert("Code submitted!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Active Contests</h1>
      <ul className="space-y-2">
        {contests.map(c => (
          <li key={c.id} className="border p-3 rounded cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedContest(c)}>
            <strong>{c.title}</strong> ({c.contest_code})
          </li>
        ))}
      </ul>

      {selectedContest && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Submit to: {selectedContest.title}</h2>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Your Email"
            onChange={e => setStudentEmail(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Question Title"
            onChange={e => setQuestionTitle(e.target.value)}
          />
          <textarea
            className="border p-2 w-full h-40"
            placeholder="Write your code here..."
            onChange={e => setCode(e.target.value)}
          ></textarea>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
