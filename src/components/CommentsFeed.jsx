import SentimentBar from "./SentimentBar";

export default function CommentsFeed({ comments, sentiment, loading }) {
  return (
    <div className="bg-black/80 rounded-xl px-2 py-2 flex flex-col gap-2 h-[400px] md:h-[520px] overflow-auto shadow">
      <h2 className="text-xl font-bold px-2">Latest Comments & Mentions</h2>
      <SentimentBar sentiment={sentiment} />
      {loading && (
        <div className="text-[#FFD700] px-2">Loading comments...</div>
      )}
      {!loading && comments && comments.length === 0 && (
        <div className="text-white/70 px-2">
          No mentions found. Check back soon.
        </div>
      )}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {!loading &&
          comments &&
          comments.map((c, idx) => (
            <div
              key={idx}
              className="flex gap-3 items-start px-2 py-2 rounded hover:bg-black/70 transition"
            >
              <div
                className={`px-2 py-1 rounded bg-[#FFD700] text-black text-xs font-bold min-w-[65px] text-center`}
              >
                {c.platform}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold underline text-sm break-all">
                    {c.username}
                  </span>
                  <span className="text-xs text-gray-400">{c.timeAgo}</span>
                </div>
                <div className="text-white/90 break-words">{c.content}</div>
                <SentimentBar sentiment={c.sentiment} small />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
