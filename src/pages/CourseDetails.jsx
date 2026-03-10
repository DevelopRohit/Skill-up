import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      const docRef = doc(db, "courses", id);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setCourse(snap.data());
      }
      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return <h2 style={{ padding: "80px" }}>Loading...</h2>;
  }

  if (!course) {
    return <h2 style={{ padding: "80px" }}>Course not found</h2>;
  }

  // 🔥 VIDEO / PLAYLIST LOGIC
  const videoSrc =
    course.youtubePlaylist ||
    (course.youtubeLink
      ? course.youtubeLink.replace("watch?v=", "embed/")
      : null);

  return (
    <div style={{ padding: "60px 8%", maxWidth: "1200px", margin: "auto" }}>
      {/* TOP SECTION */}
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <img
          src={course.image}
          alt={course.title}
          style={{
            width: "420px",
            height: "260px",
            objectFit: "cover",
            borderRadius: "18px",
          }}
        />

        <div>
          <h1>{course.title}</h1>
          <p>{course.caption}</p>

          <p style={{ marginTop: "10px" }}>
            ⭐ {course.rating} | ⏱ {course.duration} | 📘 {course.level}
          </p>

          <p style={{ marginTop: "14px" }}>{course.description}</p>
        </div>
      </div>

      {/* VIDEO */}
      <h2 style={{ marginTop: "40px" }}>Course Preview</h2>
      {videoSrc && (
        <>
          <iframe
            src={videoSrc}
            width="100%"
            height="420"
            style={{ borderRadius: "14px", marginTop: "20px" }}
            allowFullScreen
            title="Course Video"
          />
        </>
      )}

      {/* WHY LEARN */}
      <h2 style={{ marginTop: "40px" }}>Why Learn This Course?</h2>
      <ul>
        {course.whyLearn?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {/* COURSE COVERS */}
      <h2 style={{ marginTop: "40px" }}>What This Course Covers</h2>
      <p>{course.courseCovers}</p>

      {/* SKILLS */}
      <h2 style={{ marginTop: "40px" }}>Skills You Gain</h2>
      <ul>
        {course.skillsYouGain?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {/* TECHNOLOGIES */}
      <h2 style={{ marginTop: "40px" }}>Technologies</h2>
      <ul>
        {course.technologies?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {/* CURRICULUM */}
      {/* <h2 style={{ marginTop: "40px" }}>Curriculum</h2>
      <ol>
        {course.curriculum?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol> */}

      {/* PROJECTS */}
      <h2 style={{ marginTop: "40px" }}>Projects</h2>
      <ul>
        {course.projects?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {/* CAREER ROLES */}
      <h2 style={{ marginTop: "40px" }}>Career Roles</h2>
      <ul>
        {course.careerRoles?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;
