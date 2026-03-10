import styles from "./LoginModal.module.css";
import { useAuth } from "../context/AuthContext";

const LoginModal = ({ close }) => {
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    await login();
    close();
  };

  return (
    <div className={styles.overlay}>

      <div className={styles.modal}>

        <button className={styles.close} onClick={close}>
          ✕
        </button>

        <div className={styles.header}>
          <h2>Welcome to Skill-Up</h2>
          <p>Learn modern tech skills and grow your career 🚀</p>
        </div>

        <button className={styles.googleBtn} onClick={handleGoogleLogin}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            alt="google"
          />
          Continue with Google
        </button>

        <div className={styles.footer}>
          <p>By continuing you agree to our</p>
          <span>Terms & Privacy Policy</span>
        </div>

      </div>

    </div>
  );
};

export default LoginModal;