import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { userId } = useParams();  // Get the userId from the route params
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const user = useSelector((state) => state.user.user); // Assuming you store user data in state.user.user
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    bio: '',
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getUserProfileAsync(userId)); // Dispatch action to fetch user profile
    }
  }, [dispatch, status, userId]);

  useEffect(() => {
    // Populate form with existing user data once it is fetched
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        fullName: user.fullName || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData();
    formData.append('firstName', formData.firstName);
    formData.append('lastName', formData.lastName);
    formData.append('email', formData.email);
    formData.append('birthDate', formData.birthDate);
  
    // Append the file (if selected)
    if (formData.profileImage) {
      formData.append('profileImage', formData.profileImage);
    }
  
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT', // PUT request to update the user
        headers: {
          // No need to set Content-Type because FormData automatically sets it
        },
        body: formData,
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        navigate(`/Tasks/${userId}`); // Redirect to the updated profile page
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating profile');
      }
    } catch (err) {
      setError(err.message);
      setStatus('failed');
    }
  };



  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      {user && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
