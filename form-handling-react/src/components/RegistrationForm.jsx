import React, { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(false);

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="username">Username </label>
        <input style={{ marginBottom: "8px" }}
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </div>

      <div>
        <label htmlFor="email">Email </label>
        <input style={{ marginTop: "8px", marginBottom: "8px" }}
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>

      <div>
        <label htmlFor="password">Password </label>
        <input style={{ marginTop: "8px", marginBottom: "8px" }}
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>

      {error && (
        <p style={{ color: "#b00020", marginTop: "8px" }}>{error}</p>
      )}
      {submitted && !error && (
        <p style={{ color: "#1b5e20", marginTop: "8px" }}>
          Registration submitted successfully!
        </p>
      )}

      <button type="submit" style={{ marginTop: "12px" }}>
        Register
      </button>
    </form>
  );
}


