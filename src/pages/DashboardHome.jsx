import { useEffect, useState } from "react";
import DashboardCards from '@components/dashboard/DashboardCards'
import SendMoneyModal from "@components/modals/SendMoneyModal";
import ReceiveMoneyModal from "@components/modals/ReceiveMoneyModal";
import SuccessModal from "@components/modals/SuccessModal";
import { apiFetch } from "../utils/apiClient";


function DashboardHome() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showReceive, setShowReceive] = useState(false);

   // Function to cal. balance from transactions
  const computeBalance = (transactions) => {
    return transactions.reduce((sum, tx) => {
      return tx.type === "credit" ? sum + tx.amount : sum - tx.amount;
    }, 0);
  };

  const handleSendMoney = async ({ recipient, amount, note }) => {
    console.log("Send money to:", recipient, "Amount:", amount, "Note:", note);
    try {
      const updatedUser = {
        ...user,
        balance: user.balance - amount,
        transactions: [
          ...user.transactions,
          {
            id: Date.now(),
            title: `Sent to ${recipient}`,
            amount,
            type: "debit",
            date: new Date().toISOString().split("T")[0],
            note
          }
        ]
      };

      await apiFetch(`/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedUser)
      });

      const msg = `₦${amount.toLocaleString()} sent to ${recipient}`;
      setSuccessMessage(msg);
      setShowSuccess(true);

      setUser(updatedUser); // update UI immediately
    } catch (err) {
      console.error("Send money failed:", err);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) return;

    const fetchUser = async () => {
      try {
        const userData = await apiFetch(`/users/${id}`);

        // Compute balance from transactions
        const computedBalance = computeBalance(userData.transactions || []);

        setUser({
          ...userData,
          balance: computedBalance
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>  
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {user ? (
        <DashboardCards
          balance={user.balance}
          transactions={user.transactions}
          sendModal={() => setShowModal(true)}
          recieveModal={() => setShowReceive(true)}
        />
      ) : (
        <p className="text-gray-500 mt-4">Loading...</p>
      )}

      {showModal && (
        <SendMoneyModal
          user={user}
          onClose={() => setShowModal(false)}
          onSend={handleSendMoney}
        />
      )}

      {showReceive && (
        <ReceiveMoneyModal user={user} onClose={() => setShowReceive(false)} />
      )}

      {showSuccess && (
       <SuccessModal
        message={successMessage}
        onClose={() => setShowSuccess(false)}
      />
    )}
  </div>)
}   

export default DashboardHome