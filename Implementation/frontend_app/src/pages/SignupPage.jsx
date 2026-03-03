import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function SignupPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg("Creating account...");

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) return setMsg(error.message);

    setMsg("Account created ✅ Now login");
    nav("/login");
  };

  return (
    <div className="shell">
      <div className="heroCard">
        <div className="cardWide" style={{ maxWidth: 520 }}>
          <h1 className="title">Signup</h1>

          <form onSubmit={handleSignup} style={{ marginTop: 16 }}>
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
                placeholder="Min 6 characters"
                type="password"
                required
              />
            </div>

            <div className="btnRow">
              <button className="btnPrimary" type="submit">
                Create account
              </button>

              <Link className="btnSecondary" to="/login" style={{ textDecoration: "none" }}>
                Back to login
              </Link>
            </div>

            {msg ? <p style={{ marginTop: 12 }}>{msg}</p> : null}
          </form>
        </div>
      </div>
    </div>
  );
}