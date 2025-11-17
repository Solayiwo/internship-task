const BASE_URL = "http://localhost:4000";

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      // Handle HTTP errors
      const errorData = await res.json();
      throw new Error(errorData.message || "API request failed");
    }

    // If response is empty (e.g., DELETE), return null
    if (res.status === 204) return null;

    return res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
