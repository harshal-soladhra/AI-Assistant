import React, { useEffect, useState } from "react";
import "../CSS/UserDashboard.css";

const UserDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchMyCourses = async () => {
    try {   
      const response = await fetch(
        "http://localhost:3000/api/user/my-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCourses(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  if (loading) {
    return <p className="dashboard-loading">Loading your courses...</p>;
  }

  return (
    <div className="user-dashboard">
      <h1>My Enrolled Courses</h1>

      {courses.length === 0 ? (
        <div className="no-courses">
          <p>You haven’t enrolled in any courses yet.</p>
        </div>
      ) : (
        <div className="course-grid">
          {courses.map((item) => (
            <div className="course-card" key={item._id}>
              <span
                className={`status-badge status-${item.status}`}
              >
                {item.status}
              </span>

              <h3>{item.service.service}</h3>
              <p>{item.service.description}</p>

              <div className="progress-wrapper">
                <div className="progress-label">
                  Progress: {item.progress}%
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
