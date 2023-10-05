import express from "express";
import { nanoid } from "nanoid";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

const urlStorage = {};

app.use(express.json());
app.use(cors());

app.post("/api/shorten", (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Long URL is required" });
  }

  const shortKey = nanoid(7);

  const shortUrl = `http://localhost:5173/${shortKey}`;

  urlStorage[shortKey] = longUrl;

  res.json({ shortUrl });
});

app.get("/:shortKey", (req, res) => {
  const { shortKey } = req.params;
  const longUrl = urlStorage[shortKey];

  if (!longUrl) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(301, longUrl);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
