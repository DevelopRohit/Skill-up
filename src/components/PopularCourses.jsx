import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import styles from "./PopularCourses.module.css";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snapshot = await getDocs(collection(db, "courses"));

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 🔥 Only show first 4 courses as "Popular"
        setCourses(list.slice(0, 4));
      } catch (error) {
        console.error("Error fetching popular courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Popular Courses</h2>
        <p>Most in-demand skills chosen by learners</p>
      </div>

      <div className={styles.grid}>
        {courses.map((course) => (
          <div className={styles.card} key={course.id}>
            <div className={styles.imageBox}>
              <img src={course.image} alt={course.title} />
              <span className={styles.tag}>🔥 Trending</span>
            </div>

            <div className={styles.content}>
              <h3>{course.title}</h3>

              <div className={styles.meta}>
                <span>📘 {course.level}</span>
                <span>⏱ {course.duration}</span>
              </div>

              <button
                className={styles.btn}
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                View Course →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCourses;