import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, User } from "lucide-react";
import InputField from "../auth/InputField";

function SendMoneyModal({ user, onClose, onSend }) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const handleSend = () => {
    setError("");

    if (!recipient.trim()) {
      setError("Recipient is required.");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Enter a valid amount.");
      return;
    }

    if (numAmount > user.balance) {
      setError("Insufficient balance.");
      return;
    }

    onSend({ recipient, amount: numAmount, note });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#207681]/80 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Send Money</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="space-y-4">
          <InputField
            type="text"
            placeholder="Recipient ID or Email"
            icon={User}
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />

          <InputField
            type="number"
            placeholder="Amount"
            icon={ArrowDownLeft}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <InputField
            type="text"
            placeholder="Note (optional)"
            icon={ArrowUpRight}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendMoneyModal;
