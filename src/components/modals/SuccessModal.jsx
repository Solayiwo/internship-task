import { useEffect } from "react";

function SuccessModal({ message, onClose, duration = 3000 }) {

  // Auto close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-lg">

        <h2 className="text-xl font-semibold text-green-600">Success 🎉</h2>

        <p className="text-gray-700 mt-2">{message}</p>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2 rounded-lg bg-[#207681] text-white hover:bg-[#165a57] cursor-pointer transition-colors"
        >
          Continue
        </button>

      </div>
    </div>
  );
}

export default SuccessModal;
