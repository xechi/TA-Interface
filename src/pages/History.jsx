import { useState, useEffect } from "react";
import { useAuth } from "../contexts/ServiceContext";

const History = () => {
  const { getHistory } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        const sortedHistory = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setHistory(sortedHistory);
      } catch (err) {
        setError("Gagal mengambil riwayat prediksi.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Riwayat Prediksi 📜</h1>
      {loading ? (
        <p className="text-center mt-8">Memuat riwayat...</p>
      ) : error ? (
        <p className="text-center mt-8 text-red-500">{error}</p>
      ) : history.length === 0 ? (
        <p className="text-center text-gray-500">
          Belum ada riwayat prediksi yang ditemukan.
        </p>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-800 mb-2 text-justify">
                <strong>Berita:</strong> {item.news}
              </p>
              <div className="flex justify-between items-center text-sm">
                <p>
                  <strong>Prediksi:</strong>{" "}
                  <span
                    className={
                      item.prediction === "Hoaks"
                        ? "font-bold text-red-600"
                        : "font-bold text-green-600"
                    }
                  >
                    {item.prediction}
                  </span>
                </p>
                <p className="text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
