import React, { useState, useEffect } from "react";
import "../Styles/Main.css";

const Main = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3003/profile/users"); // Update the URL as needed
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);





  if (loading) return <p>Say welcome to other managers <br />     Loading users...</p>;
  if (error) return <p>Error: {error}</p>;



  return (
    <div className="container">
      <h1 className="heading">Say welcome to other managers.</h1>
      {users && users.length > 0 ? (
        <ul className="listUsers">
          {users.map((user) => (
            <li key={user._id}>
              <div className="user_info">
                <img
                  src={user.profileImage || "https://via.placeholder.com/50"}
                  alt={user.firstName}
                  className="user_photo"
                />
                <div>
                  <div className="user_name">{user.firstName}</div>
                  <p>{user.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};

export default Main;
