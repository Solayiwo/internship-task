import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputField from "./InputField";
import { UserIcon, MailIcon, LockIcon } from "../icons/Icons";
import { validateField } from "../../utils/validators";
import { apiFetch } from "../../utils/apiClient";

function AuthSignUp() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Clear general error after 3 seconds
  useEffect(() => {
    if (errors.general) {
      const timer = setTimeout(() => {
        setErrors((prev) => ({ ...prev, general: "" }));
      }, 1000); // 1 seconds
      return () => clearTimeout(timer);
    }
  }, [errors.general]);

  // Handle updates + real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validate all fields
    let newErrors = {};
    Object.keys(formData).forEach((field) => {
      const msg = validateField(field, formData[field]);
      if (msg) newErrors[field] = msg;
    });

    // If any validation errors exist
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);

      // simulate a short delay to make loading noticeable
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Check if email exists
      const existingUsers = await apiFetch(`/users?email=${formData.email}`);

      if (existingUsers.length > 0) {
        setErrors({ email: "Email already exists." });
        setIsLoading(false);
        return;
      }

      // Create user
      const newUser = {
        ...formData,
        balance: 0,
        transactions: [],
      };

      await apiFetch("/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      });

      setMessage("Account created successfully!");
      setIsLoading(false);

      setTimeout(() => (window.location.href = "/auth/login"), 1000);
    } catch (error) {
      console.error(error);
      setErrors({general: "Something went wrong. Try again.",});
      setIsLoading(false);
    }
  };
  

  return (
    <div className="h-[88vh] flex items-center justify-center ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 dark:bg-gray-900">
        {/* Logo + Title */}
        <div className="flex flex-col items-center pb-4">
          <span className="text-[#207681] font-bold text-2xl">Koinsave</span>
          <span className="text-gray-600 text-sm">Smart. Simple. Secure.</span>
        </div>

        {/* General error */}
        {errors.general && (
          <p className="text-red-500 text-sm my-2 text-center">{errors.general}</p>
        )}

        {/* Success message */}
        {message && (
          <p className="text-green-600 text-sm my-2 text-center">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FULL NAME */}
          <InputField
            icon={UserIcon}
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm">{errors.fullname}</p>
          )}

          {/* EMAIL */}
          <InputField
            icon={MailIcon}
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          {/* PASSWORD */}
          <InputField
            icon={LockIcon}
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 rounded-lg font-medium text-white ${
              isLoading
                ? "bg-[#207681]/50 cursor-not-allowed"
                : "bg-[#207681] hover:bg-green-600 cursor-pointer"
            }`}
          >
            {isLoading && (
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
            {isLoading ? "Creating..." : "Create Account"}
          </button>

          
        </form>

        <div className="text-center text-sm text-gray-600 mt-3">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-[#207681] font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
export default AuthSignUp;
