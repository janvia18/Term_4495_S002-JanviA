import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

function readPoints() {
  const raw = localStorage.getItem("points");
  const n = raw ? Number(raw) : 215;
  return Number.isFinite(n) ? n : 215;
}

function readModuleProgress() {
  try {
    const raw = localStorage.getItem("moduleProgress");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function Modules() {
  const [points, setPoints] = useState(readPoints());
  const [progress, setProgress] = useState(readModuleProgress());

  useEffect(() => {
    const onFocus = () => {
      setPoints(readPoints());
      setProgress(readModuleProgress());
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const modules = useMemo(
    () => [
      {
        key: "phishing",
        title: "Phishing Awareness 📧",
        desc: "Spot urgency tricks, fake senders, and suspicious links.",
        time: "10 min",
        route: "/modules/phishing",
      },
      {
        key: "passwords",
        title: "Password Security 🔐",
        desc: "Passphrases, unique passwords, and password managers.",
        time: "8 min",
        route: "/modules/passwords",
        locked: true, 
      },
      {
        key: "social",
        title: "Social Engineering 🕵️",
        desc: "How attackers manipulate people, not systems.",
        time: "9 min",
        route: null,
        locked: true,
      },
    ],
    []
  );

  const getStatus = (key, locked) => {
    if (locked) return "Locked";
    if (progress?.[key]?.status) return progress[key].status;
    return "Not Started";
  };

  return (
    <div className="shell">
      <div className="heroCard">
        <div className="cardWide" style={{ maxWidth: 980 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <h1 className="title" style={{ marginBottom: 6 }}>Modules</h1>
              <p className="mutedText" style={{ margin: 0 }}>
                Points (demo): <b>{points}</b>
              </p>
            </div>

            <NavLink to="/dashboard" className="btnSecondary" style={{ textDecoration: "none" }}>
              Back to Dashboard
            </NavLink>
          </div>

          <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
            {modules.map((m) => {
              const status = getStatus(m.key, m.locked);
              const score = progress?.[m.key]?.score ?? null;

              return (
                <div
                  key={m.key}
                  className="dashCard"
                  style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}
                >
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 16 }}>{m.title}</div>
                    <div className="mutedText" style={{ marginTop: 4 }}>{m.desc}</div>
                    <div className="mutedText" style={{ marginTop: 6 }}>
                      Time: <b>{m.time}</b>
                      {score != null ? <> | Score: <b>{score}%</b></> : null}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span className="pill" style={{ fontWeight: 900 }}>
                      {status === "Completed" ? "Completed ✅" : status === "In Progress" ? "In Progress ⏳" : status}
                    </span>

                    {m.locked || !m.route ? (
                      <button className="btnSecondary" disabled>
                        Locked
                      </button>
                    ) : (
                      <NavLink to={m.route} className="btnPrimaryLink" style={{ textDecoration: "none" }}>
                        {status === "Not Started" ? "Start" : "Open"}
                      </NavLink>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mutedText" style={{ marginTop: 14 }}>
            Progress is stored in your browser (localStorage). Supabase sync comes later.
          </div>
        </div>
      </div>
    </div>
  );
}