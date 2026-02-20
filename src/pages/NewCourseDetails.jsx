import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const NewCourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const snap = await getDoc(doc(db, "courses", id));
      if (snap.exists()) setCourse(snap.data());
    };
    fetchCourse();
  }, [id]);

  if (!course) return <h2 style={{ padding: "80px" }}>Loading...</h2>;

  return (
    <div style={{ padding: "60px 8%" }}>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <img src={course.image} alt={course.title} style={{ maxWidth: "600px" }} />
    </div>
  );
};

export default NewCourseDetails;
