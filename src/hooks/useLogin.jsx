import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { backendBaseURL } from "../utils/imageUrl";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(backendBaseURL + "/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error);
      }

      const userData = await response.json();

      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(userData));

      // Update the auth context, include storeStatus in the payload
      dispatch({ type: "LOGIN", payload: { ...userData, storeStatus: userData.storeStatus } });

      // Update loading state
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
