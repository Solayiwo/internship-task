import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { MailIcon, LockIcon } from "../icons/Icons";
import { validateLoginField } from "../../utils/validators";
import { apiFetch } from "../../utils/apiClient";

function AuthLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(""); // For general errors or success messages
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);


  // Handle input changes + real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    const errorMsg = validateLoginField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    Object.keys(form).forEach((field) => {
      const errMsg = validateLoginField(field, form[field]);
      if (errMsg) validationErrors[field] = errMsg;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);

      const users = await apiFetch(`/users?email=${form.email}`);
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (users.length === 0 || users[0].password !== form.password) {
        setMessage("Invalid Credentials.");
        setIsLoading(false);
        return;
      }

      const user = users[0];
      localStorage.setItem("koinsave_loggedInUser", JSON.stringify(user));
      localStorage.setItem("userId", user.id);

      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard");
      }, 1400);
    } catch (error) {
      console.error(error);
      await new Promise((resolve) => setTimeout(resolve, 400)); 
      setMessage("Something went wrong. Try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[88vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 dark:bg-gray-900">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-[#207681]">Koinsave</h1>
          <p className="text-gray-600 mt-1">Welcome back, log into your account</p>
        </div>

        {message && <p className="text-center text-sm my-2  text-red-500">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={MailIcon}
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <InputField
            icon={LockIcon}
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 rounded-lg font-medium text-white 
              ${isLoading ? "bg-[#207681]/50 cursor-not-allowed" : "bg-[#207681] hover:bg-green-600 cursor-pointer"}
            `}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {isLoading ? "Loading..." : "Sign In"}
          </button>

          
        </form>

        <div className="text-center mt-4 text-sm">
          <button className="text-gray-600 hover:underline cursor-pointer">Forgot Password?</button>
        </div>

        <div className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-[#207681] font-medium hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;
