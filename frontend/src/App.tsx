import { useState } from "react";
import { motion } from "framer-motion";

const emotionIcons: Record<string, string> = {
  joy: "😄",
  sadness: "😢",
  anger: "😠",
  fear: "😨",
  surprise: "😲",
  neutral: "😐",
};

const emotionColors: Record<string, string> = {
  joy: "bg-yellow-100 border-yellow-300 text-yellow-800",
  sadness: "bg-blue-100 border-blue-300 text-blue-800",
  anger: "bg-red-100 border-red-300 text-red-800",
  fear: "bg-purple-100 border-purple-300 text-purple-800",
  surprise: "bg-pink-100 border-pink-300 text-pink-800",
  neutral: "bg-gray-100 border-gray-300 text-gray-800",
};

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

  const emotionStyle =
    result && emotionColors[result.emotion]
      ? emotionColors[result.emotion]
      : "bg-indigo-50 border-indigo-200 text-indigo-700";

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center px-4 transition-colors duration-300">
        <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-gray-900">
          <h1 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
            Emotion Reflection Tool
          </h1>

          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            rows={4}
            placeholder="How are you feeling today?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={200}
            autoFocus
          ></textarea>

          <p className="text-sm text-gray-500 text-right mt-1">
            {text.length}/200 characters
          </p>

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

          {/* Loading skeleton */}
          {loading && (
            <div className="mt-6 animate-pulse space-y-3">
              <div className="h-4 bg-indigo-200 rounded w-1/2 mx-auto"></div>
              <div className="h-3 bg-indigo-100 rounded w-1/3 mx-auto"></div>
            </div>
          )}

          {/* Emotion result card */}
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`mt-6 border p-4 rounded-lg text-center ${emotionStyle}`}
            >
              <p className="text-4xl mb-2">
                {emotionIcons[result.emotion] || "🧠"}
              </p>
              <p className="text-lg font-semibold capitalize">
                Emotion: {result.emotion}
              </p>
              <p className="text-sm">
                Confidence: {(result.confidence * 100).toFixed(1)}%
              </p>
            </motion.div>
          )}

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-500">
            Made with ❤️ by Rahul Swarup
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
