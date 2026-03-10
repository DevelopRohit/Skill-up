import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snapshot = await getDocs(collection(db, "courses"));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(list);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // 🔥 ADVANCED FILTER LOGIC
  const filteredCourses = courses.filter((course) => {
    return (
      course.title?.toLowerCase().includes(query) ||
      course.description?.toLowerCase().includes(query) ||
      course.category?.toLowerCase().includes(query) ||
      course.skillsYouGain?.join(" ").toLowerCase().includes(query)
    );
  });

  if (loading) {
    return <h2 style={{ padding: "80px" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "60px 8%" }}>
      <h2>Search results for "{query}"</h2>

      {filteredCourses.length === 0 ? (
        <p>No related courses found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "24px",
            marginTop: "30px",
          }}
        >
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              style={{
                background: "#fff",
                borderRadius: "14px",
                padding: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={course.image}
                alt={course.title}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h3 style={{ margin: "12px 0 6px" }}>{course.title}</h3>

              <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                {course.description?.slice(0, 100)}...
              </p>

              <button
                onClick={() => navigate(`/courses/${course.id}`)}
                style={{
                  marginTop: "12px",
                  width: "100%",
                  padding: "10px",
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                View Course
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
