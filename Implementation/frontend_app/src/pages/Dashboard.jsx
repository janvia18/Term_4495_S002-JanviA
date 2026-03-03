import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";


const avatarEmoji = {
  bear: "🐻",
  horse: "🐴",
  cat: "🐱",
  dog: "🐶",
  fox: "🦊",
  panda: "🐼",
  rabbit: "🐰",
  tiger: "🐯",
  lion: "🦁",
  monkey: "🐵",
  koala: "🐨",
  penguin: "🐧",
  frog: "🐸",
  owl: "🦉",
  unicorn: "🦄",
  dragon: "🐲",
};

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    setProfile(saved ? JSON.parse(saved) : null);
  }, []);

  const stats = useMemo(() => {
  const points = 215;

  const level = Math.floor(points / 200) + 1;

  const completed = 2;
  const total = 6;
  const percent = Math.round((completed / total) * 100);

  return { points, level, completed, total, percent };
}, []);



  if (!profile) {
    return (
      <div className="cardWide">
        <h1 className="title">Learner Dashboard</h1>
        <p className="text">No profile found. Please create your profile first.</p>
        <NavLink to="/" className="btnPrimaryLink">
          Go to Home
        </NavLink>
      </div>
    );
  }

  return (
    <div className="dashWrap">
      <div className="dashHeader">
        <div>
          <h1 className="title" style={{ marginBottom: 4 }}>
            CyberAware
          </h1>
          <p className="mutedText">Learner Dashboard</p>
        </div>

        <div className="profileChip">
          <span className="chipEmoji">{avatarEmoji[profile.avatar] || "🙂"}</span>
          <span>{profile.name}</span>
        </div>
      </div>

      <div className="dashGrid">
        <div className="dashCard">
          <h2 className="dashCardTitle">
            Welcome {avatarEmoji[profile.avatar] || "🙂"}{" "}
            <span>{profile.name}</span>
          </h2>
          <p className="text">
            Learn through comic modules, quick activities, and short quizzes.
          </p>

          <div className="btnRow" style={{ marginTop: 10 }}>
           <NavLink to="/modules" className="btnPrimaryLink">
            Start Module
            </NavLink>
            <button className="btnSecondary" disabled>
            Quick Quiz (soon)
            </button>
          </div>

          <div className="progressArea">
            <div className="progressTop">
              <span className="mutedText">Progress</span>
              <span className="mutedText">
                {stats.completed}/{stats.total}
              </span>
            </div>

            <div className="progressBar">
              <div
                className="progressFill"
                style={{ width: `${stats.percent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="dashCard">
          <h3 className="dashSmallTitle">Points</h3>
          <div className="bigNumber">{stats.points}</div>

          <h3 className="dashSmallTitle" style={{ marginTop: 14 }}>
            Level
          </h3>
          <div className="bigNumber">Level {stats.level}</div>
        </div>
      </div>

      <div className="dashCard" style={{ marginTop: 16 }}>
        <h3 className="dashSmallTitle">Modules</h3>

        <div className="moduleGrid">
          <div className="moduleCard">
            <div className="moduleTitle">Phishing Awareness 📧</div>
            <div className="mutedText">Status: In Progress</div>
          </div>

          <div className="moduleCard">
            <div className="moduleTitle">Password Security 🔐</div>
            <div className="mutedText">Status: Not Started</div>
          </div>

          <div className="moduleCard locked">
            <div className="moduleTitle">Social Engineering 🕵️</div>
            <div className="mutedText">Locked (Coming Soon)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
