import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setBusy(true);

    const action = mode === "signin" ? signIn : signUp;
    const { data, error } = await action(email.trim(), password);

    setBusy(false);
    if (error) {
      setMessage(error.message);
    } else if (mode === "signup") {
      // No session -> email confirmation required.
      // session -> confirmation is off and AuthContext swaps to the app.
      if (!data.session) {
        setMessage("Check your email to confirm your account, then sign in.");
      } else {
        setMessage("Account created. Signing you in…");
      }
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-brand">Screenie</h1>
        <p className="auth-subtitle">
          {mode === "signin" ? "Sign in to your account" : "Create an account"}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            minLength={6}
            required
          />
          <button className="auth-button" type="submit" disabled={busy}>
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <button
          className="auth-switch"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setMessage("");
          }}
        >
          {mode === "signin"
            ? "Need an account? Sign up"
            : "Have an account? Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Auth;