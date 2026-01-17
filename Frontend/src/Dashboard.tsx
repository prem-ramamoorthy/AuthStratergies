import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const [showConfetti, setShowConfetti] = useState(true);
    const navigate = useNavigate();
    const stratergy = localStorage.getItem("authMethod") || "basic";

    const onLogout = () => {
        if (stratergy === "basic") {
            localStorage.removeItem("loggedin");
            localStorage.removeItem("authMethod");
            alert("Logged out successfully!");
            navigate('/');
        }
        else if (stratergy === "oauth_google") {
            localStorage.removeItem("loggedin");
            localStorage.removeItem("authMethod");
            fetch('https://auth-stratergies-mg2m.vercel.app/auth/oauth/logout', {
                method: 'POST',
                credentials: 'include',
            }).then(() => alert("Logged out successfully!")).finally(() => navigate('/'));
        }
        else if (stratergy === "session") {
            localStorage.removeItem("loggedin");
            localStorage.removeItem("authMethod");
            fetch('https://auth-stratergies-mg2m.vercel.app/session/logout', {
                method: 'POST',
                credentials: 'include',
            }).then(() => alert("Logged out successfully!")).finally(() => navigate('/'));
        }
        else if (stratergy === "jwt") {
            localStorage.removeItem("loggedin");
            localStorage.removeItem("authMethod");
            fetch('https://auth-stratergies-mg2m.vercel.app/jwt/logout', {
                method: 'POST',
                credentials: 'include',
            }).then(() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                alert("Logged out successfully!");
            }).finally(() => navigate('/'));
        }
        else {
            navigate('/');
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 6000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50">
            {showConfetti && <Confetti />}

            <div className="max-w-3xl mx-auto pt-20 px-6">
                <div className="bg-white rounded-xl shadow p-8 text-center">
                    <h1 className="text-3xl font-bold text-green-600 mb-2">
                        Logged in successfully
                    </h1>

                    <p className="text-gray-600 mb-6">
                        Welcome to the authentication dashboard
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-left mb-6">
                        <div className="bg-gray-100 p-4 rounded">
                            <p className="font-semibold">Auth Status</p>
                            <p className="text-green-600">Authenticated</p>
                        </div>

                        <div className="bg-gray-100 p-4 rounded">
                            <p className="font-semibold">Strategy</p>
                            <p>{stratergy}</p>
                        </div>
                    </div>

                    <button
                        onClick={onLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
