import React, { useEffect, useState } from 'react';
import './dropDownTasks.css'; // Import the CSS file

const Favorites = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(parsedTasks);
      console.log(parsedTasks); // Log after setting the tasks
      setLoading(false);
    } else {
      setError('No tasks found in localStorage');
      setLoading(false);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="CONTAINER">
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks
          .filter((task) => task.isFavorite === true) // Only show favorite tasks
          .map((task) => (
            <div className="sub" key={task._id}>
              <h3 className="text">{task.Subject}</h3>
            </div>
          ))
      )}
    </div>
  );
};

export default Favorites;
