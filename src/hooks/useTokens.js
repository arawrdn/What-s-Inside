import { useState, useEffect } from "react";
import axios from "axios";

// DexScreener API: https://api.dexscreener.com/latest/dex/tokens?chainId=8453
const MOCK_TOKENS = [
  {
    symbol: "PEPE",
    name: "Pepe the Frog",
    priceUSD: "0.0000023",
    priceChange24h: 22.1,
    priceChange1h: 5.4,
    priceChange6h: 11.3,
    priceChange15m: 1.2,
    priceChange30m: 2.8,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/28298.png",
    address: "0xabc123...pepe",
    trending: true,
    newpair: false,
  },
  // ...9 more mock tokens with similar structure
];

export default function useTokens() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchTokens() {
    setLoading(true);
    setError(false);
    try {
      // Uncomment for live fetch
      /*
      const resp = await axios.get(
        "https://api.dexscreener.com/latest/dex/tokens?chainId=8453"
      );
      // Map API result to desired token structure
      const mapped = resp.data.tokens.slice(0, 10).map(t => ({
        symbol: t.symbol,
        name: t.name,
        priceUSD: t.priceUsd,
        priceChange24h: t.priceChange24h,
        priceChange1h: t.priceChange1h,
        priceChange6h: t.priceChange6h,
        priceChange15m: t.priceChange15m,
        priceChange30m: t.priceChange30m,
        logoURI: t.logoURI,
        address: t.address,
        trending: t.trending,
        newpair: t.newpair,
      }));
      setTokens(mapped);
      */
      setTokens(MOCK_TOKENS);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchTokens();
    const id = setInterval(fetchTokens, 90000); // poll every 1.5 min
    return () => clearInterval(id);
  }, []);

  return { tokens, loading, error };
}
