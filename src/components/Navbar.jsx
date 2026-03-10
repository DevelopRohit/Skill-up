import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = ({ openLogin }) => {
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const profileRef = useRef(null);

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  };

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          📘 <span>Skill-Up</span>
        </div>

        <ul className={styles.links}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/courses">Courses</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>

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

          {/* SIGN BUTTON */}

          {!user && (
            <button className={styles.cta} onClick={openLogin}>
              Sign In
            </button>
          )}

          {/* PROFILE */}

          {user && (
            <div className={styles.profileWrapper} ref={profileRef}>
              <img
                src={user.photoURL}
                className={styles.profileIcon}
                onClick={() => setShowProfile(!showProfile)}
              />

              {showProfile && (
                <div className={styles.profileDropdown}>
                  <img src={user.photoURL} className={styles.profileLarge} />

                  <h4>{user.displayName}</h4>
                  <p>{user.email}</p>

                  <button onClick={logout} className={styles.logoutBtn}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
