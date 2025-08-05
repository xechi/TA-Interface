import { useState } from "react";
import { useAuth } from "../contexts/ServiceContext";

const Home = () => {
  const { predictNews } = useAuth();
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    if (!text) {
      setError("Silakan masukkan teks untuk diprediksi.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await predictNews(text);
      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Terjadi kesalahan saat prediksi."
      );
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (prediction) => {
    return prediction === "Hoaks" ? "text-red-600" : "text-green-600";
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl flex justify-center min-h-[90vh] flex-col">
      <h1 className="text-3xl font-bold mb-4">Deteksi Hoaks 🧐</h1>
      <p className="mb-6 text-gray-600">
        Masukkan teks atau link berita di bawah ini untuk memeriksa apakah ialah
        hoaks potensial. Model ini sudah di-train untuk mendeteksi berita
        terkait Prabowo, Gibran, atau entitas pemerintah.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <textarea
          className="w-full p-3 border rounded-md"
          rows="6"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tempel teks atau link berita di sini..."
        ></textarea>
        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full mt-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {loading ? "Menganalisis..." : "Cek Berita"}
        </button>
      </div>

      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {result && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Hasil Prediksi:</h2>
          <p className="mb-2 text-gray-700 text-justify">
            <strong>Berita:</strong> {result.news}
          </p>
          <p
            className={`text-xl font-bold ${getConfidenceColor(
              result.prediction
            )}`}
          >
            Prediksi: {result.prediction}
          </p>
          <p className="mb-2 text-gray-800">
            <strong>Keyakinan:</strong> {result.confidence.toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
