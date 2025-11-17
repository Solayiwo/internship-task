function LogoutModal({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-64 rounded-xl shadow-lg p-6 flex flex-col items-center">
        {/* Loader Spinner */}
        <div className="h-10 w-10 border-4 border-[#207681] border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-4 text-gray-700 font-medium">Logging out...</p>
      </div>
    </div>
  );
}

export default LogoutModal;
