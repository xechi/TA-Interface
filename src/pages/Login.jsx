import { useState } from "react";
import { useAuth } from "../contexts/ServiceContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await login(email, password);
      setSuccess("Berhasil masuk!");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal melakukan autentikasi.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-center">
            Hai, Selamat Datang!
          </h2>
          <p className="text-center">Silakan masuk dengan akun anda.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Masuk
          </button>
        </form>
        <p className="text-sm text-center">
          Belum memiliki akun?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Daftar disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
