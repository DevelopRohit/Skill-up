import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../firebase";
import styles from "./Courses.module.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const snapshot = await getDocs(collection(db, "courses"));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(list);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <h2 style={{ padding: "80px", textAlign: "center" }}>Loading courses...</h2>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>Explore Our Courses</h1>
        <p>Industry-focused courses updated in real-time</p>
      </div>

      <div className={styles.grid}>
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className={styles.imageBox}>
              <img src={course.image} alt={course.title} />
              <span className={styles.level}>{course.level}</span>
            </div>

            <div className={styles.content}>
              <h3>{course.title}</h3>
              <p>{course.caption}</p>
              <p>Rating ⭐{course.rating}</p>
              {/* <p>{course.description}</p> */}

              <span className={styles.meta}>⏱ {course.duration}</span>

              <button
                className={styles.btn}
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                View Course →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
