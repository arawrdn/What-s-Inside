import { useWalletKit, useAccount } from "@reown/walletkit-react";
import { useEffect, useState } from "react";
import WalletAssets from "./WalletAssets";

export default function Header() {
  const { connect, disconnect, address, isConnected, chain } = useAccount();
  const { autoConnectBase } = useWalletKit();
  const [showAssets, setShowAssets] = useState(false);

  useEffect(() => {
    autoConnectBase();
  }, [autoConnectBase]);

  return (
    <header className="w-full flex flex-col md:flex-row items-start md:items-center justify-between px-4 pt-6 pb-4 bg-[#FFD700] text-black shadow-lg">
      <div>
        <h1 className="text-3xl font-extrabold">What&apos;s Inside</h1>
        <p className="text-md text-black/80">
          Find tokens that are being talked about — a guide before you buy or
          sell.
        </p>
      </div>
      <div className="flex items-center mt-4 md:mt-0 gap-2">
        {isConnected ? (
          <div className="flex flex-col items-end gap-1">
            <span className="px-3 py-1 rounded-full bg-black text-[#FFD700] text-xs font-semibold">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
            <button
              className="text-xs underline hover:text-black"
              onClick={() => setShowAssets((a) => !a)}
            >
              {showAssets ? "Hide" : "Show"} My Tokens
            </button>
            <button
              className="bg-black text-[#FFD700] px-3 py-1 rounded text-xs mt-1 hover:bg-yellow-600"
              onClick={disconnect}
            >
              Disconnect
            </button>
            {showAssets && <WalletAssets address={address} />}
          </div>
        ) : (
          <button
            className="bg-black text-[#FFD700] px-5 py-2 rounded font-semibold hover:bg-yellow-700 transition"
            onClick={connect}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}
