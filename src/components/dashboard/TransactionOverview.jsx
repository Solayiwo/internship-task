import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { apiFetch } from "../../utils/apiClient";

function TransactionOverview() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      setLoading(false);
      return;
    }
    

    const fetchUserTransactions = async () => {
      try {
        const userData = await apiFetch(`/users/${id}`);
        setTransactions(userData.transactions || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTransactions();
  }, []);

  if (loading) {
    return <p className="text-gray-500 mt-4">Loading transactions...</p>;
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6 border mt-6 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 dark:text-white">Recent Transactions</h2>

      {transactions.length > 0 ? (
        <ul className="space-y-4">
          {transactions.slice(0,).reverse().map((tx) => (
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
                  {tx.type === "credit" ? "+" : "-"}₦{tx.amount.toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No recent transactions</p>
      )}
    </div>
  );
}

export default TransactionOverview;
