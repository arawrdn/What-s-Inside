import { useEffect, useState } from "react";

export default function WalletAssets({ address }) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssets() {
      setLoading(true);
      // Placeholder: fetch logic for Base tokens
      try {
        /*
        const resp = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens?chainId=8453&address=${address}`
        );
        const data = await resp.json();
        setAssets(data.results || []);
        */
        setAssets([
          { symbol: "ETH", name: "Ethereum", balance: "0.65" },
          { symbol: "USDC", name: "USD Coin", balance: "220" },
        ]);
      } catch (e) {
        setAssets([]);
      }
      setLoading(false);
    }
    if (address) fetchAssets();
  }, [address]);

  if (loading) return <div className="text-xs">Loading assets…</div>;
  if (!assets.length)
    return <div className="text-xs text-black/70">No tokens</div>;

  return (
    <div className="text-xs mt-2 w-44">
      <ul>
        {assets.map((a) => (
          <li key={a.symbol} className="flex justify-between py-0.5">
            <span>{a.symbol}</span>
            <span>{a.balance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
