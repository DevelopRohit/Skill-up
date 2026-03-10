import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import styles from "./LoginModal.module.css";

const LoginModal = ({ close }) => {
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    await login();
    close();
  };

  // ESC key se close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [close]);

  return (
    <div className={styles.overlay} onClick={close}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // prevent outside click inside modal
      >
        <button className={styles.closeBtn} onClick={close}>
          ✕
        </button>

        <h2>Welcome Back 👋</h2>
        <p>Sign in to continue learning</p>

        {/* Email Input (UI only) */}
        <input
          type="email"
          placeholder="Email address"
          className={styles.input}
        />

        {/* Password Input (UI only) */}
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
        />

        <div className={styles.options}>
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <span className={styles.link}>Forgot Password?</span>
        </div>

        <button className={styles.loginBtn}>
          Login
        </button>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <button className={styles.googleBtn} onClick={handleGoogleLogin}>
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className={styles.signupText}>
          Don’t have an account? <span className={styles.link}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;