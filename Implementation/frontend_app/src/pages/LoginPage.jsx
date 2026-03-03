import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("Logging in...");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);

    setMsg("Logged in ✅");
    nav("/dashboard");
  };

  return (
    <div className="shell">
      <div className="heroCard">
        <div className="cardWide" style={{ maxWidth: 520 }}>
          <h1 className="title">Login</h1>

          <form onSubmit={handleLogin} style={{ marginTop: 16 }}>
            <div className="field">
              <label className="label">Email</label>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="field">
              <label className="label">Password</label>
              <input
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                type="password"
                required
              />
            </div>

            <div className="btnRow">
              <button className="btnPrimary" type="submit">
                Login
              </button>

              <Link className="btnSecondary" to="/signup" style={{ textDecoration: "none" }}>
                Create account
              </Link>
            </div>

            {msg ? <p style={{ marginTop: 12 }}>{msg}</p> : null}
          </form>
        </div>
      </div>
    </div>
  );
}