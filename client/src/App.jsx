// client/src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch from our new /api/exams endpoint
    fetch("/api/exams")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setExams(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="App">
      <h1>Government Exam Guides</h1>
      <div className="exam-list">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <div key={exam.shortName} className="exam-card">
              <h2>{exam.name}</h2>
              <p>{exam.description}</p>
              {/* This link won't work yet, but we'll set up routing later */}
              <a href={`/exams/${exam.shortName}`}>View Details</a>
            </div>
          ))
        ) : (
          <p>
            No exams found. You need to run a scraper script to add data to your
            database!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
