import { useAuth } from "../context/AuthContext";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <h2 style={{ padding: "80px", textAlign: "center" }}>
        Please login to view profile
      </h2>
    );
  }

  // 🔥 EMAIL SAFE FETCH
  const email =
    user?.email ??
    user?.providerData?.find((p) => p.email)?.email ??
    "Email not available";

  return (
    <div className={styles.profilePage}>
      <div className={styles.card}>
        <img
          src={
            user.photoURL ||
            "https://ui-avatars.com/api/?name=User&background=2563eb&color=fff&size=256"
          }
          alt="Profile"
          className={styles.avatar}
        />

        <h2>{user.displayName || "User"}</h2>

        {/* ✅ EMAIL NOW SHOWS */}
        <p className={styles.email}>{email}</p>

        <button className={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
