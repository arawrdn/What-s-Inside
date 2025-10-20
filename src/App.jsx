import { useState, useEffect } from "react";
import Header from "./components/Header";
import TokenRow from "./components/TokenRow";
import CommentsFeed from "./components/CommentsFeed";
import SelectedTokenDetails from "./components/SelectedTokenDetails";
import FooterSubscribe from "./components/FooterSubscribe";
import useTokens from "./hooks/useTokens";
import useComments from "./hooks/useComments";

export default function App() {
  const { tokens, loading: tokensLoading, error: tokensError } = useTokens();
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(0);

  // On tokens load, set the first one as selected
  useEffect(() => {
    if (tokens && tokens.length) {
      setSelectedToken(tokens[selectedIdx]);
    }
  }, [tokens, selectedIdx]);

  // Get latest mentions/comments for selected token
  const {
    comments,
    sentiment,
    loading: commentsLoading,
  } = useComments(selectedToken);

  return (
    <div className="min-h-screen flex flex-col bg-black text-[#FFD700] ">
      <Header />

      <main className="flex flex-1 flex-col md:flex-row md:gap-8 container mx-auto px-4 py-4 w-full">
        {/* Tokens List */}
        <section className="md:w-[40%] w-full">
          <h2 className="font-bold text-2xl mb-2">Top 10 Hype Tokens</h2>
          <div className="flex flex-col gap-3">
            {tokensLoading && (
              <div className="text-[#FFD700]">Loading tokens...</div>
            )}
            {!tokensLoading &&
              tokens &&
              tokens.map((token, idx) => (
                <TokenRow
                  key={token.address}
                  token={token}
                  selected={
                    selectedToken && token.address === selectedToken.address
                  }
                  onClick={() => {
                    setSelectedIdx(idx);
                    setSelectedToken(token);
                  }}
                />
              ))}
            {tokensError && (
              <div className="text-red-400">Failed to load tokens.</div>
            )}
          </div>
        </section>

        {/* Main Feed & Token Details */}
        <section className="md:w-[60%] w-full mt-8 md:mt-0 flex flex-col gap-4">
          <SelectedTokenDetails token={selectedToken} />
          <CommentsFeed
            comments={comments}
            sentiment={sentiment}
            loading={commentsLoading}
          />
        </section>
      </main>
      <FooterSubscribe />
    </div>
  );
}
