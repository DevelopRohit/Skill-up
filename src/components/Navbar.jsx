import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const { user, login, logout } = useAuth();
  const profileRef = useRef(null);

  const handleSearch = () => {
    const trimmed = search.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    setSearch("");
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

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
          {/* SEARCH */}
          <div className={styles.searchBox}>
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>

          {/* LOGIN BUTTON */}
          {!user && (
            <button className={styles.cta} onClick={login}>
              Sign In
            </button>
          )}

          {/* PROFILE ICON */}
          {user && (
            <div className={styles.profileWrapper} ref={profileRef}>
              <img
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${user.displayName}&background=2563eb&color=fff`
                }
                alt="profile"
                className={styles.profileIcon}
                onClick={() => setShowProfile((prev) => !prev)}
              />

              {showProfile && (
                <div className={styles.profileDropdown}>
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${user.displayName}&background=2563eb&color=fff&size=256`
                    }
                    alt="profile"
                    className={styles.profileLarge}
                  />

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