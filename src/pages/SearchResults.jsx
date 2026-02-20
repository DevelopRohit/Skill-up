import { useSearchParams, Link } from "react-router-dom";
import coursesData from "../data/coursesData";

const SearchResults = () => {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  const results = coursesData.filter(course =>
    course.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: "60px 8%" }}>
      <h2>Results for "{query}"</h2>

      {results.map(course => (
        <Link key={course.id} to={`/courses/${course.id}`}>
          <p>{course.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
