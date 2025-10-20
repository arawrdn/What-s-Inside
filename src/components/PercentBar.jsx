export default function PercentBar({ token }) {
  // Assume priceChange24h for coloring bar; animate on props change for real app
  const pct = token.priceChange24h;
  const isBull = pct > 0;

  return (
    <div className="my-1 flex items-center gap-2">
      <div
        className={`h-2 w-24 rounded-full bg-gradient-to-r ${
          isBull ? "from-green-400 to-green-700" : "from-red-400 to-red-700"
        } relative overflow-hidden`}
      >
        <div
          className="h-2"
          style={{
            width: `${Math.min(Math.abs(pct), 100)}%`,
            transition: "width 0.6s cubic-bezier(.5,2,.5,1)",
          }}
        />
      </div>
      <div
        className={
          isBull ? "text-green-500 font-bold" : "text-red-500 font-bold"
        }
      >
        {isNaN(pct) ? "0%" : (pct > 0 ? "+" : "") + pct.toFixed(2) + "%"}
      </div>
    </div>
  );
}
