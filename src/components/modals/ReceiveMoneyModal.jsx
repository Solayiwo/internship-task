import { ClipboardCopy, Check, Wallet } from "lucide-react";
import { useState } from "react";

function ReceiveMoneyModal({ user, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.id);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 bg-[#207681]/80 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Receive Money</h2>

        <p className="text-gray-600 mb-4">
          Share your Wallet ID with someone to receive money.
        </p>

        {/* Wallet ID Box */}
        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-2">
            <Wallet className="text-[#207681]" />
            <span className="font-semibold">{user.id}</span>
          </div>

          <button
            onClick={handleCopy}
            className="p-2 rounded hover:bg-gray-200 cursor-pointer transition"
          >
            {copied ? (
              <Check className="text-green-600" />
            ) : (
              <ClipboardCopy className="text-gray-600" />
            )}
          </button>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReceiveMoneyModal;
