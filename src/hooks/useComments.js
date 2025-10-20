import { useState, useEffect } from "react";
import axios from "axios";

// sentiment: -1 (bearish) to +1 (bullish)
// comments = [{platform, username, content, timeAgo, sentiment}, ...]

const MOCK_COMMENTS = [
  {
    platform: "Twitter",
    username: "@elonmusk",
    content: "Pepe is 🚀 Ready for new ATH. $PEPE",
    timeAgo: "2m ago",
    sentiment: 0.9,
  },
  {
    platform: "Farcaster",
    username: "farcaster_max",
    content: "Huge pump on $PEPE. Bullish?",
    timeAgo: "5m ago",
    sentiment: 0.7,
  },
  // ...18 more
];

export default function useComments(token) {
  const [comments, setComments] = useState([]);
  const [sentiment, setSentiment] = useState(0);
  const [loading, setLoading] = useState(true);

  async function fetchComments() {
    setLoading(true);
    // For live, merge from Farcaster & Serper.dev Twitter APIs.
    try {
      /*
      // --- FARCASTER ---
      const fcBaseUrl = "https://warpcast.com/api/v1/token-mentions";
      const fcResp = await axios.get(`${fcBaseUrl}?token=${token.symbol}`);
      const farcasterComments = fcResp.data.posts.map(p => ({
        platform: "Farcaster",
        username: p.author.username,
        content: p.content,
        timeAgo: p.timeAgo,
        sentiment: p.sentiment, // replace with sentiment analysis (optional)
      }));

      // --- SERPER.DEV (Twitter) ---
      const twitterResp = await axios.post(
        "https://google.serper.dev/search",
        { q: token.symbol + " base token" },
        { headers: { "X-API-KEY": "4800429d209256b6c3d4e38977c2768f07665952" } }
      );
      const twitterComments = twitterResp.data.organic.map(t => ({
        platform: "Twitter",
        username: t.title,
        content: t.snippet,
        timeAgo: "N/A",
        sentiment: 0, // replace with sentiment analysis (optional)
      }));

      // Merge & slice to 20
      const merged = [...farcasterComments, ...twitterComments]
        .slice(0, 20);
      setComments(merged);
      // Simple average sentiment
      setSentiment(
        merged.length
          ? merged.reduce((a, b) => a + (b.sentiment || 0), 0) / merged.length
          : 0
      );
      */
      setComments(MOCK_COMMENTS);
      setSentiment(
        MOCK_COMMENTS.reduce((a, b) => a + b.sentiment, 0) /
          MOCK_COMMENTS.length,
      );
    } catch (_) {
      setComments([]);
      setSentiment(0);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (token) fetchComments();
    const id = setInterval(fetchComments, 75000); // poll every 75s
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, [token && token.symbol]);

  return { comments, sentiment, loading };
}
