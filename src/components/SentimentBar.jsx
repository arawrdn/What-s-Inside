export default function SentimentBar({ sentiment, small }) {
  const color =
    sentiment >= 0.1
      ? "bg-gradient-to-r from-green-400 to-green-700"
      : sentiment <= -0.1
        ? "bg-gradient-to-r from-red-400 to-red-700"
        : "bg-gradient-to-r from-gray-300 to-gray-500";
  return (
    <div
      className={`rounded-full ${color} h-${small ? "1" : "2"} w-full my-1`}
      style={{
        width: `${Math.min(Math.abs(sentiment) * 100, 100)}%`,
        minWidth: small ? "40px" : "100px",
        transition: "width 0.7s cubic-bezier(.5,2,.5,1)",
      }}
    />
  );
}
