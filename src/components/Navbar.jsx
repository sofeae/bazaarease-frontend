import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import bazaar from "../assets/images/bazaar.png";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();

    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
      {/* <div className="logo-wrapper pl-4 flex items-center">
          <Link to="/seller" className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
            <img src={bazaar} alt="logo" className="w-32 h-32 object-cover" />
          </Link>
        </div> */}
        <Link to="/seller">
          <h1>BazaarEase</h1>
        </Link>
        <nav className={styles.nav}>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
