import React, { useEffect, useState } from "react";
import { initSDK } from "./sdkHelper";

function App() {
  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function start() {
      try {
        const ctx = await initSDK();
        setUser(ctx.user);

        const res = await fetch(`/api/streak?fid=${ctx.user.fid}`);
        const data = await res.json();
        setStreak(data.streak);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    start();
  }, []);

  const onCastToday = async () => {
    if (!user) return;
    await fetch(`/api/streak`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fid: user.fid })
    });
    const res = await fetch(`/api/streak?fid=${user.fid}`);
    const data = await res.json();
    setStreak(data.streak);
  };

  if (loading) {
    return (
      <div
        style={{
          backgroundImage: "url('/splash.png')",
          backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 24
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>Cast Streak</h1>
      {user ? (
        <>
          <p>नमस्ते {user.username || user.fid} 👋</p>
          <p>आपकी streak है: <strong>{streak}</strong> दिन</p>
          <button onClick={onCastToday}>आज cast किया ✅</button>
        </>
      ) : (
        <p>Farcaster यूज़र लोड हो रहा है...</p>
      )}
    </div>
  );
}

export default App;
