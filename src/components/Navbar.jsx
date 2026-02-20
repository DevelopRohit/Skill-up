import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/search?q=${search}`);
    setSearch("");
  };

  const handleLogin = async () => {
    await login();
    navigate("/profile");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* LOGO */}
        <div className={styles.logo} onClick={() => navigate("/")}>
          📘 <span>Skill-Up</span>
        </div>

        {/* LINKS */}
        <ul className={styles.links}>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/courses" className={({ isActive }) => isActive ? styles.active : ""}>
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ""}>
              About
            </NavLink>
          </li>
        </ul>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <div className={styles.searchBox}>
            <input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>

          {!user ? (
            <button className={styles.cta} onClick={handleLogin}>
              Sign In
            </button>
          ) : (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span>{user.displayName}</span>
              <button onClick={logout} className={styles.cta}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;