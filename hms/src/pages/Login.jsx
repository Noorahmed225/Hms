import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        // Check empty fields
        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }

        try {
            const response = await fetch("https://hospital-monitoring-system-backend.onrender.com/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                setError("");
                navigate("/home");
            } else {
                // Login failed
                setError(data.error || "Invalid email or password");
            }

        } catch (error) {
            setError("Unable to connect to server");
            console.error(error);
        }
    };

    return (
        <div className="Log">
            <h1>Login</h1>

            <div className="details">
                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <p className="error">{error}</p>
                    )}

                    <div className="button">
                        <button type="submit">
                            Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;