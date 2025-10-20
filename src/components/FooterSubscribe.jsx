import { useState } from "react";

export default function FooterSubscribe() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function subscribe() {
    // Add your subscription logic or API here.
    setSubscribed(true);
  }

  return (
    <footer className="w-full py-8 flex flex-col items-center bg-black text-[#FFD700] gap-2 border-t-2 border-[#FFD700] mt-auto">
      <form
        className="flex gap-2 items-center bg-black"
        onSubmit={(e) => {
          e.preventDefault();
          if (email) subscribe();
        }}
      >
        <input
          type="email"
          required
          disabled={subscribed}
          className="p-2 rounded bg-[#FFD700] text-black outline-none focus:ring-2 focus:ring-yellow-200 min-w-[180px]"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="px-5 py-2 rounded bg-[#FFD700] text-black font-bold hover:bg-yellow-300 transition disabled:opacity-60"
          type="submit"
          disabled={subscribed}
        >
          {subscribed ? "Subscribed!" : "Subscribe"}
        </button>
      </form>
      <div className="mt-2 text-sm opacity-70 select-none">
        Powered by <span className="font-semibold">@aradeaward</span>
      </div>
    </footer>
  );
}
