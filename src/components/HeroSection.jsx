import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      {/* BACKGROUND GLOW */}
      <div className={styles.glow}></div>

      <div className={styles.container}>
        {/* LEFT CONTENT */}
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* BADGES */}
          <div className={styles.badges}>
            <span>🚀 Job Ready Skills</span>
            <span>🔥 Industry Focused</span>
            <span>🎓 Beginner Friendly</span>
          </div>

          <h1>
            Build <span>Future-Ready Skills</span>
            <br />
            That Companies Actually Need
          </h1>

          <p>
            Learn practical skills with real projects, modern tools, and
            structured learning paths — not boring theory.
          </p>

          {/* CTA BUTTONS */}
          <div className={styles.actions}>
            <button
              className={styles.primary}
              onClick={() => navigate("/courses")}
            >
              Explore Courses 🚀
            </button>

            <button
              className={styles.secondary}
              onClick={() => navigate("/about")}
            >
              Why Skill-Up?
            </button>
          </div>

          <small className={styles.note}>
            ⭐ Trusted by students preparing for real-world tech careers
          </small>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className={styles.right}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Learning illustration"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
