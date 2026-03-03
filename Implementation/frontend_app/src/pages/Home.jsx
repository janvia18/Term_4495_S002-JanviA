import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { supabase } from "../lib/supabaseClient";

const avatars = [
  { id: "bear", label: "Bear", emoji: "🐻" },
  { id: "horse", label: "Horse", emoji: "🐴" },
  { id: "cat", label: "Cat", emoji: "🐱" },
  { id: "dog", label: "Dog", emoji: "🐶" },
  { id: "fox", label: "Fox", emoji: "🦊" },
  { id: "panda", label: "Panda", emoji: "🐼" },
  { id: "rabbit", label: "Rabbit", emoji: "🐰" },
  { id: "tiger", label: "Tiger", emoji: "🐯" },
  { id: "lion", label: "Lion", emoji: "🦁" },
  { id: "monkey", label: "Monkey", emoji: "🐵" },
  { id: "koala", label: "Koala", emoji: "🐨" },
  { id: "penguin", label: "Penguin", emoji: "🐧" },
  { id: "frog", label: "Frog", emoji: "🐸" },
  { id: "owl", label: "Owl", emoji: "🦉" },
  { id: "unicorn", label: "Unicorn", emoji: "🦄" },
  { id: "dragon", label: "Dragon", emoji: "🐲" },
];

export default function Home() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const loadProfile = async () => {

      const saved = localStorage.getItem("profile");
      if (saved) {
        const p = JSON.parse(saved);
        setName(p?.name || "");
        setAvatar(p?.avatar || "");
      }

      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (session) {
        const { data: row } = await supabase
          .from("profiles")
          .select("name, avatar")
          .eq("user_id", session.user.id)
          .single();

        if (row) {
          setName(row.name);
          setAvatar(row.avatar);
          localStorage.setItem("profile", JSON.stringify(row));
        }
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    if (!name.trim() || !avatar) return;

    const profileData = {
      name: name.trim(),
      avatar,
    };

    localStorage.setItem("profile", JSON.stringify(profileData));

    setMsg("Saving...");

    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (session) {
      const { error } = await supabase.from("profiles").upsert(
        {
          user_id: session.user.id,
          name: profileData.name,
          avatar: profileData.avatar,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

      if (error) {
        setMsg("Saved locally only ❗");
      } else {
        setMsg("Saved to database");
      }
    } else {
      setMsg("Saved locally  (Login to sync)");
    }

    navigate("/dashboard");
  };

  const handleReset = async () => {
    setName("");
    setAvatar("");
    setMsg("");
    localStorage.removeItem("profile");

    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (session) {
      await supabase.from("profiles").delete().eq("user_id", session.user.id);
    }
  };

  return (
    <div className="shell">
      <div className="heroCard">
        <div className="cardWide">
          <h1 className="title">Create your profile</h1>

          <div className="field">
            <label className="label">Your name</label>
            <input
              className="input"
              placeholder="e.g., Janvi"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="label">Pick a character</label>

            <div className="grid">
              {avatars.map((a) => (
                <button
                  key={a.id}
                  className={avatar === a.id ? "avatarCard selected" : "avatarCard"}
                  onClick={() => setAvatar(a.id)}
                  type="button"
                >
                  <div className="emoji">{a.emoji}</div>
                  <div className="avatarLabel">{a.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="btnRow">
            <button
              className="btnPrimary"
              onClick={handleSave}
              disabled={!name.trim() || !avatar}
            >
              Save
            </button>

            <button className="btnSecondary" onClick={handleReset}>
              Reset
            </button>
          </div>

          {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
        </div>
      </div>
    </div>
  );
}