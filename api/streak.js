let streaks = {};

export default async function handler(req, res) {
  const fid = req.query.fid || (req.body && req.body.fid);
  if (!fid) return res.status(400).json({ error: "fid missing" });

  if (req.method === "GET") {
    return res.status(200).json({ streak: streaks[fid] || 0 });
  } else if (req.method === "POST") {
    streaks[fid] = (streaks[fid] || 0) + 1;
    return res.status(200).json({ streak: streaks[fid] });
  }
}
