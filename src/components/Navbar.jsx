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

  // ✅ Outside click close FIXED
  useEffect(() => {
    const handleClickOutside = (event) => {
<<<<<<< HEAD
      if (profileRef.current && !profileRef.current.contains(event.target)) {
=======
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
>>>>>>> 58e38f1b2bac92770d02e7d4c38ae1d5e6e663b6
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
<<<<<<< HEAD
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/courses">Courses</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
=======
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/courses">Courses</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
>>>>>>> 58e38f1b2bac92770d02e7d4c38ae1d5e6e663b6
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
<<<<<<< HEAD
            <div className={styles.profileWrapper} ref={profileRef}>
=======
            <div
              className={styles.profileWrapper}
              ref={profileRef}
            >
>>>>>>> 58e38f1b2bac92770d02e7d4c38ae1d5e6e663b6
              <img
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${user.displayName}&background=2563eb&color=fff`
                }
                alt="profile"
                className={styles.profileIcon}
<<<<<<< HEAD
                onClick={() => setShowProfile((prev) => !prev)}
=======
                onClick={() =>
                  setShowProfile((prev) => !prev)
                }
>>>>>>> 58e38f1b2bac92770d02e7d4c38ae1d5e6e663b6
              />

              {/* ✅ DROPDOWN RENDER FIX */}
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

<<<<<<< HEAD
                  <button onClick={logout} className={styles.logoutBtn}>
=======
                  <button
                    onClick={logout}
                    className={styles.logoutBtn}
                  >
>>>>>>> 58e38f1b2bac92770d02e7d4c38ae1d5e6e663b6
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
