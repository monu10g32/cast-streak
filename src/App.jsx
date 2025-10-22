import React, { useEffect, useState } from "react";
import { initSDK } from "./sdkHelper";

function App() {
  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function start() {
      const ctx = await initSDK();
      setUser(ctx.user);
      const res = await fetch(`/api/streak?fid=${ctx.user.fid}`);
      const data = await res.json();
      setStreak(data.streak);
    }
    start();
  }, []);

  const onCastToday = async () => {
    await fetch(`/api/streak`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fid: user.fid })
    });
    const res = await fetch(`/api/streak?fid=${user.fid}`);
    const data = await res.json();
    setStreak(data.streak);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Cast Streak</h1>
      {user ? (
        <>
          <p>नमस्ते {user.username || user.fid} 👋</p>
          <p>आपकी streak है: {streak} दिन</p>
          <button onClick={onCastToday}>आज cast किया ✅</button>
        </>
      ) : (
        <p>लोड हो रहा है...</p>
      )}
    </div>
  );
}

export default App;
