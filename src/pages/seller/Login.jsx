import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const { login, error, isLoading } = useLogin();
  const nav = useNavigate();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, businessName);
  };

  useEffect(() => {
    if (user) {
      console.log("Redirected user to menu page");
      nav("/seller");
    }
  });

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-bold mb-4">Log In</h3>

      <label className="mb-2">Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="mb-2 p-2 w-full"
      />

      <label className="mb-2">Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="mb-2 p-2 w-full"
      />

      <label className="mb-2">Business Name:</label>
      <input
        type="businessName"
        onChange={(e) => setBusinessName(e.target.value)}
        value={businessName}
        className="mb-4 p-2 w-full"
      />

    <button disabled={isLoading} className="bg-yellow-500 text-white px-4 py-2 rounded mb-4">
      Log in
    </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
