import { Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const DashboardCards = ({ balance, transactions, sendModal, recieveModal }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {/* Balance Card */}
      <div className="bg-white rounded-2xl shadow p-6 border self-start dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Wallet Balance</h2>
          <Wallet className="text-blue-600" />
        </div>

        <p className="text-4xl font-bold mt-4 text-gray-900 dark:text-white">
          ₦{balance?.toLocaleString() || "0"}
        </p>

        <p className="text-sm text-gray-500 dark:text-white mt-1">
          Available Balance
        </p>

        <div className="mt-4 flex justify-end gap-3">
           <button
            onClick={sendModal}
            className="flex flex-row px-4 py-2 bg-[#207681]/30 text-[#207681] dark:text-white rounded cursor-pointer hover:bg-green-600 hover:text-white"
          >
            <ArrowUpRight />
            Send Money
          </button>

          <button
            onClick={recieveModal}
            className="flex flex-row px-4 py-2 bg-[#207681] text-white rounded cursor-pointer hover:bg-green-600"
          >
            <ArrowDownLeft/>
            Recieve Money
          </button>

        </div>
      </div>

      {/* Transactions Card */}
      <div className="bg-white rounded-2xl shadow p-6 border dark:bg-gray-900 ">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Recent Transactions</h2>
        </div>

        <ul className="mt-4 space-y-4">
          {transactions?.length > 0 ? (
            transactions.slice(-5).reverse().map((tx) => (
              <li
                key={tx.id}
                className="flex items-center justify-between border-b pb-3 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{tx.title}</p>
                  <p className="text-xs text-gray-500 dark:text-white">{tx.date}</p>
                </div>

                <div className="flex items-center gap-2">
                  {tx.type === "credit" ? (
                    <ArrowDownLeft className="text-green-600" />
                  ) : (
                    <ArrowUpRight className="text-red-600" />
                  )}

                  <p
                    className={`font-semibold ${
                      tx.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type === "credit" ? "+" : "-"}₦
                    {tx.amount.toLocaleString()}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No recent transactions</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardCards;
