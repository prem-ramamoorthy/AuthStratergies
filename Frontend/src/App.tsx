import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMethod, setAuthMethod] = useState<"jwt" | "basic" | "session">("basic");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  async function handleGoogleLogin() {
    setLoading(true);
    localStorage.setItem("authMethod", "oauth_google");
    window.location.href = "http://localhost:3000/auth/oauth/google";
  }

  async function handleAuth() {
    try {
      setLoading(true);

      const endpoint = isRegister
        ? `http://localhost:3000/auth/register`
        : authMethod !== "basic" ? `http://localhost:3000/${authMethod}/login` : `http://localhost:3000/auth/login`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: authMethod === "session" ? 'include' : 'same-origin',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert(isRegister ? "Registration successful!" : "Login successful!");
        if (isRegister) {
          setIsRegister(false);
        }
        else {
          localStorage.setItem("authMethod", authMethod);
          localStorage.setItem("loggedin", "true");
          if (authMethod === "jwt") {
            localStorage.setItem("access_token", data?.token)
            localStorage.setItem("refresh_token", data?.refreshToken)
          }
          navigate('/dashboard')
        }
      } else {
        alert(data.message || "Error");
      }
    } catch (error) {
      setLoading(false);
      alert("An unexpected error occurred." + error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">
          {isRegister ? "Register" : "Sign In"}
        </h1>
        <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }} className="mb-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        {!isRegister && (
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center"
          >
            <p className="w-fit bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition mb-4 px-3 ">{loading ? "Signing in..." : "Google signin "}</p>
          </button>
        )}
        {!isRegister && (
          <p className="text-gray-600 text-center mb-6">
            Select an authentication strategy to continue
          </p>
        )}
        {!isRegister && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Authentication Method
            </label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="jwt"
                name="authMethod"
                value="jwt"
                checked={authMethod === "jwt"}
                onChange={(e) => setAuthMethod(e.target.value as "jwt" | "basic" | "session")}
                className="mr-2"
              />
              <label htmlFor="jwt" className="text-sm">JWT</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="basic"
                name="authMethod"
                value="basic"
                checked={authMethod === "basic"}
                onChange={(e) => setAuthMethod(e.target.value as "jwt" | "basic" | "session")}
                className="mr-2"
              />
              <label htmlFor="basic" className="text-sm">Basic Authentication</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="session"
                name="authMethod"
                value="session"
                checked={authMethod === "session"}
                onChange={(e) => setAuthMethod(e.target.value as "jwt" | "basic" | "session")}
                className="mr-2"
              />
              <label htmlFor="session" className="text-sm">Session</label>
            </div>
          </div>
        )}
        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition mb-4"
        >
          {loading ? (isRegister ? "Registering..." : "Signing in...") : (isRegister ? "Register" : "Sign In")}
        </button>

        <button
          onClick={() => setIsRegister(!isRegister)}
          className="w-full text-blue-600 hover:text-blue-800 text-sm"
        >
          {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
}
