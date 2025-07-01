
import { useState } from 'react';
import { getSuggestions } from '../useGemini';

function TextSummarizer({ title, author }) {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    const result = await getSuggestions(title, author);
    setSummary(result);
    setLoading(false);
  };

  return (
    <div className="p-4">
        <h2> 🤖 AI Recommendation Component</h2>
      <button
        onClick={handleSummarize}
        className="mt-2 bg-blue-500 text-white px-4 py-2"
      >
        {loading ? "Loading..." : "Suggest Similar Books"}
      </button>

      <ul className="mt-4 list-disc ml-5">
        {summary.map((point, i) => (
          <li key={i}>
            <strong>Title:</strong> {point.title}, <strong>Author:</strong> {point.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TextSummarizer;
