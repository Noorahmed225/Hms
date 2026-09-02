import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {

        e.preventDefault();

        console.log("SIGNUP BUTTON CLICKED");

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill all the details");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/signup/",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log("DJANGO RESPONSE:", data);

            if (!response.ok) {
                setError(data.error);
                return;
            }

            alert("Signup successful!");

            navigate("/login");

        } catch (error) {

            console.error("ERROR:", error);

            setError("Cannot connect to Django server");
        }
    };

    return (
        <div className="Signup-container">

            <h1>Signup</h1>

            <div className="text">

                <form onSubmit={handleSignup}>

                    <label>Name</label>

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />

                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}

                    <div className="button">

                        <button type="submit">
                            Signup
                        </button>

                    </div>

                    <p>
                        If you have an account{" "}
                        <Link to="/login">
                            Click here to login
                        </Link>
                    </p>

                </form>

            </div>

        </div>
    );
};

export default Signup;