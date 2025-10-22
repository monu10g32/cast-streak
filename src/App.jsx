function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function start() {
      const ctx = await initSDK();
      setUser(ctx.user);
      const res = await fetch(`/api/streak?fid=${ctx.user.fid}`);
      const data = await res.json();
      setStreak(data.streak);
      setLoading(false);
    }
    start();
  }, []);

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
