// validators.js

export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validateField(name, value) {
  switch (name) {
    case "fullname":
      if (!value.trim()) return "Full name is required.";
      break;

    case "email":
      if (!value.trim()) return "Email is required.";
      if (!isValidEmail(value)) return "Enter a valid email (e.g. name@example.com).";
      break;

    case "password":
      if (!value.trim()) return "Password is required.";
      if (value.length < 6) return "Password must be at least 6 characters.";
      break;

    default:
      return "";
  }

  return "";
}

export function validateLoginField(name, value) {
  switch (name) {
    case "email":
      if (!value.trim()) return "Email is required.";
      if (!isValidEmail(value)) return "Enter a valid email (e.g. name@example.com).";
      return "";

    case "password":
      if (!value.trim()) return "Password is required.";
      if (value.length < 6)
        return "Password must be at least 6 characters.";
      return "";

    default:
      return "";
  }
}