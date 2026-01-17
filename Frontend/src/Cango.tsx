import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Cango() {
    const refresh_token = localStorage.getItem("refresh_token") || "";
    const authstrategy = localStorage.getItem("authMethod") || "basic";
    const [valid, setisValid] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (authstrategy === "session") {
                    const res = await fetch("https://auth-stratergies-mg2m.vercel.app/session/authenticate", {
                        method: "GET",
                        credentials: "include"
                    });

                    setisValid(res.status === 200);
                    setLoading(false);
                    return;
                }

                if (authstrategy === "oauth_google") {
                    const res = await fetch("https://auth-stratergies-mg2m.vercel.app/auth/oauth/authenticate", {
                        method: "GET",
                        credentials: "include"
                    });

                    setisValid(res.status === 200);
                    setLoading(false);
                    return;
                }

                if (authstrategy === "jwt") {
                    const res = await fetch("https://auth-stratergies-mg2m.vercel.app/jwt/authenticate", {
                        method: "GET",
                        credentials: "include",
                        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token") || ""}` }
                    });

                    if (res.ok) {
                        setisValid(true);
                        setLoading(false);
                        return;
                    }

                    if (res.status === 401) {
                        const refreshRes = await fetch("https://auth-stratergies-mg2m.vercel.app/jwt/refresh", {
                            method: "POST",
                            credentials: "include",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ refreshToken: refresh_token })
                        });

                        if (!refreshRes.ok) {
                            setisValid(false);
                            setLoading(false);
                            return;
                        }

                        const data = await refreshRes.json();
                        localStorage.setItem("access_token", data.token);
                        localStorage.setItem("refresh_token", data.refreshToken);

                        setisValid(true);
                        setLoading(false);
                        return;
                    }

                    setisValid(false);
                    setLoading(false);
                    return;
                }

                if (authstrategy === "basic") {
                    setisValid(localStorage.getItem("loggedin") === "true");
                    setLoading(false);
                    return;
                }

                setisValid(false);
                setLoading(false);
            } catch {
                setisValid(false);
                setLoading(false);
            }
        };

        checkAuth();
    }, [authstrategy, refresh_token]);

    if (loading) return null;

    if (!valid) return <Navigate to="/" replace />;

    return <Outlet />;
}