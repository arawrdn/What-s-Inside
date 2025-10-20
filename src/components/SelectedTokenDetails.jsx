export default function SelectedTokenDetails({ token }) {
  if (!token)
    return (
      <div className="p-6 bg-black/80 rounded-xl shadow text-center">
        <div>Select a token to see details and social comments.</div>
      </div>
    );

  return (
    <div className="bg-black/80 rounded-xl px-4 py-4 mb-3 flex flex-col md:flex-row md:items-center gap-4 shadow">
      <img
        src={token.logoURI || "/placeholder.png"}
        alt={token.symbol}
        className="w-14 h-14 rounded-full bg-white border border-[#FFD700] object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-bold text-lg">{token.symbol}</span>
          <span className="text-sm text-yellow-300 font-semibold">
            {token.name}
          </span>
          <span className="bg-[#FFD700] text-black px-2 py-1 rounded text-xs font-bold ml-2 select-all">
            {token.address.slice(0, 6)}...{token.address.slice(-4)}
          </span>
          <button
            className="ml-2 px-2 py-1 bg-yellow-600 hover:bg-[#FFD700] text-black text-xs rounded transition"
            onClick={() => navigator.clipboard.writeText(token.address)}
          >
            Copy CA
          </button>
        </div>
        <div className="flex flex-wrap gap-3 items-center text-sm mt-2">
          <div>
            Price: <span className="font-bold">${token.priceUSD}</span>
          </div>
          <div>
            15m: {token.priceChange15m}% | 30m: {token.priceChange30m}% | 1h:{" "}
            {token.priceChange1h}% | 6h: {token.priceChange6h}% | 24h:{" "}
            {token.priceChange24h}%
          </div>
        </div>
      </div>
    </div>
  );
}
