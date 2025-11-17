import { useState, useEffect } from "react";
import InputField from "@components/auth/InputField";
import { User, Mail, Lock } from "lucide-react";
import { apiFetch } from "../utils/apiClient"; // adjust path if needed

function Settings() {
  const [user, setUser] = useState(null);

  // Form states
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Loading & message states
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // type: 'success' | 'error'

  // Load user from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("koinsave_loggedInUser"));
    if (savedUser) {
      setUser(savedUser);
      setFullname(savedUser.fullname || ""); // lowercase
      setEmail(savedUser.email || "");
    }
  }, []);

  // Auto-clear messages after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Profile Update
  const handleProfileUpdate = async () => {
    if (!fullname.trim()) {
      setMessage({ text: "Full name cannot be empty.", type: "error" });
      return;
    }

    try {
      setIsUpdatingProfile(true);
      setMessage({ text: "", type: "" });

      const updatedUser = { ...user, fullname };

      // Update backend
      await apiFetch(`/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({ fullname }),
      });

      // Small delay to make loading visible
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update localStorage
      localStorage.setItem("koinsave_loggedInUser", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (error) {
      console.error(error);
      setMessage({ text: "Failed to update profile. Try again.", type: "error" });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Password Update
  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword) {
      setMessage({ text: "Please fill out both password fields.", type: "error" });
      return;
    }

    if (oldPassword !== user.password) {
      setMessage({ text: "Old password is incorrect.", type: "error" });
      return;
    }

    try {
      setIsUpdatingPassword(true);
      setMessage({ text: "", type: "" });

      const updatedUser = { ...user, password: newPassword };

      // Update backend
      await apiFetch(`/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({ password: newPassword }),
      });

      // Small delay to show loading
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update localStorage
      localStorage.setItem("koinsave_loggedInUser", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setOldPassword("");
      setNewPassword("");
      setMessage({ text: "Password updated successfully!", type: "success" });
    } catch (error) {
      console.error(error);
      setMessage({ text: "Failed to update password. Try again.", type: "error" });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Profile Section */}
      <div className="bg-white p-5 rounded-xl border shadow mb-6 dark:bg-gray-900">
        <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
        <div className="space-y-4">
          <InputField
            icon={User}
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            disabled={isUpdatingProfile}
          />

          <InputField
            icon={Mail}
            placeholder="Email Address"
            value={email}
            disabled
          />

          <button
            onClick={handleProfileUpdate}
            disabled={isUpdatingProfile}
            className={`w-80 flex justify-center items-center px-4 py-2 rounded-lg text-white ${
              isUpdatingProfile
                ? "bg-[#207681]/50 cursor-not-allowed"
                : "bg-[#207681] hover:bg-[#1b5f63] cursor-pointer"
            }`}
          >
            {isUpdatingProfile && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            )}
            {isUpdatingProfile ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Password Section */}
      <div className="bg-white p-5 rounded-xl border shadow mb-6 dark:bg-gray-900">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <div className="space-y-4">
          <InputField
            type="password"
            icon={Lock}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            disabled={isUpdatingPassword}
          />

          <InputField
            type="password"
            icon={Lock}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isUpdatingPassword}
          />

          <button
            onClick={handlePasswordChange}
            disabled={isUpdatingPassword}
            className={`w-80 flex justify-center items-center px-4 py-2 rounded-lg text-white ${
              isUpdatingPassword
                ? "bg-green-600/50 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 cursor-pointer"
            }`}
          >
            {isUpdatingPassword && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            )}
            {isUpdatingPassword ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div
          className={`col-span-full text-center text-sm ${
            message.type === "success" ? "text-green-600" : "text-red-500"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}

export default Settings;
