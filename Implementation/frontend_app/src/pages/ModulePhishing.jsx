import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function ModulePhishing() {
  const comic = useMemo(
    () => [
      {
        who: "IT Support 🧑‍💻",
        text: "Hi! Your account has been flagged. Click this link to confirm your password ASAP.",
      },
      { who: "You 🙂", text: "Hmm… the message feels urgent. The link looks weird too." },
      {
        who: "IT Support 🧑‍💻",
        text: "If you don’t verify in 10 minutes, your email will be locked.",
      },
      { who: "You 🙂", text: "I’m going to check the sender address and report it instead of clicking." },
    ],
    []
  );

  const [picked, setPicked] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [msg, setMsg] = useState("");

  const correct = "B";

  const submit = () => {
    // Debug guard
    if (!picked) {
      setMsg("Pick an option first 🙂");
      return;
    }

    setSubmitted(true);

    // Points
    const savedPoints = localStorage.getItem("points");
    const currentPoints = savedPoints ? Number(savedPoints) : 215;
    const add = picked === correct ? 25 : 0;
    const nextPoints = (Number.isFinite(currentPoints) ? currentPoints : 215) + add;
    localStorage.setItem("points", String(nextPoints));

    // Module progress
    const progressRaw = localStorage.getItem("moduleProgress");
    const progress = safeParse(progressRaw, {});

    progress.phishing = {
      status: "Completed",
      score: picked === correct ? 100 : 60,
    };

    localStorage.setItem("moduleProgress", JSON.stringify(progress));

    setMsg(picked === correct ? "✅ Correct! +25 points" : "❌ Not quite (still saved as completed)");
  };

  return (
    <div className="cardWide">
      <h1 className="title">Phishing Awareness 📧</h1>
      <p className="text">Goal: Spot red flags and choose the safest next step.</p>

      <div className="dashCard" style={{ marginTop: 14 }}>
        <h3 className="dashSmallTitle">Mini Comic</h3>

        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          {comic.map((p, idx) => (
            <div key={idx} className="moduleCard" style={{ background: "rgba(255,255,255,0.85)" }}>
              <div className="moduleTitle">{p.who}</div>
              <div className="text" style={{ marginTop: 6 }}>
                {p.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashCard" style={{ marginTop: 14 }}>
        <h3 className="dashSmallTitle">Quick Activity</h3>
        <p className="text" style={{ marginTop: 8 }}>
          You receive an urgent email asking you to “verify your password” using a link. What should you do?
        </p>

        <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
          {[
            { key: "A", text: "Click the link and login quickly so your account isn’t locked." },
            {
              key: "B",
              text: "Do NOT click. Check sender details and report as phishing (or contact IT using official channels).",
            },
            { key: "C", text: "Forward it to friends to ask if it looks real." },
          ].map((opt) => (
            <button
              key={opt.key}
              type="button"
              className={`avatarCard ${picked === opt.key ? "selected" : ""}`}
              style={{ textAlign: "left" }}
              onClick={() => {
                setPicked(opt.key);
                setMsg(""); 
              }}
              disabled={submitted}
            >
              <div className="moduleTitle">
                {opt.key}. <span className="mutedText">{opt.text}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="btnRow" style={{ marginTop: 12 }}>
          <button
            className="btnPrimary"
            type="button"
            onClick={submit}
            disabled={!picked || submitted}
          >
            Submit
          </button>

          <NavLink
            to="/modules"
            className="btnSecondary"
            style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
          >
            Back to Modules
          </NavLink>

          {submitted ? (
            <button
              className="btnSecondary"
              type="button"
              onClick={() => {
                setPicked(null);
                setSubmitted(false);
                setMsg("");
              }}
            >
              Try Again
            </button>
          ) : null}
        </div>

        {msg ? <p style={{ marginTop: 12, fontWeight: 800 }}>{msg}</p> : null}

        {submitted && (
          <div className="dashCard" style={{ marginTop: 12 }}>
            {picked === correct ? (
              <>
                <div className="moduleTitle">✅ Correct!</div>
                <div className="mutedText">
                  Nice. The safest move is to avoid clicking, verify via official channels, and report it.
                </div>
              </>
            ) : (
              <>
                <div className="moduleTitle">❌ Not quite</div>
                <div className="mutedText">
                  Clicking links in urgent emails is risky. The better move is to report it and verify through official channels.
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}