"use client";
import { useEffect, useState } from "react";

export default function WelcomeUser() {
  const [greeting, setGreeting] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) return; // If not logged in → don't show

    setUser(u.split("@")[0]);

    const h = new Date().getHours();
    if (h < 12) setGreeting("🌅 Good Morning");
    else if (h < 17) setGreeting("☀️ Good Afternoon");
    else if (h < 21) setGreeting("🌆 Good Evening");
    else setGreeting("🌙 Good Night");
  }, []);

  // If not logged in → show nothing
  if (!user) return null;

  return (
    <span
      className="text-success fw-semibold"
      style={{ fontSize: "14px", whiteSpace: "nowrap" }}
    >
      {greeting}, <span className="text-dark">Welcome {user} 👋</span>
    </span>
  );
}
