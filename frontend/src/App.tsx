import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    emotion: string;
    confidence: number;
  } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
          Emotion Reflection Tool
        </h1>

        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          rows={4}
          placeholder="How are you feeling today?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className={`mt-4 w-full py-2 text-white rounded-lg transition-all ${
            loading || !text.trim()
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Analyzing..." : "Reflect"}
        </button>

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}

        {result && (
          <div className="mt-6 bg-indigo-50 border border-indigo-200 p-4 rounded-lg text-center">
            <p className="text-lg text-indigo-700 font-semibold">
              Emotion: {result.emotion}
            </p>
            <p className="text-sm text-indigo-600">
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
