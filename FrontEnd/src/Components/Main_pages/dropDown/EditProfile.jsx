import React, { useState } from 'react';
import './EditProfile.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const EditProfile = () => {
  const { userId } = useParams();
  const Navigate=useNavigate()
  // Extract userId from the URL parameters
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);




  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('birthDate', birthDate);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await fetch(`http://localhost:3003/profile/users/${userId}`, {
        method: 'PUT', // Use PUT method as per the backend
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update user. Please try again.');
      }
console.log('User updated')
Navigate('/')
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="USER_UPDATE_FORM">
      <h2 className="FORM_TITLE">Update User Information</h2>
      <form className="FORM" onSubmit={handleSubmit}>
        <div className="FORM_FIELD">
          <label className="LABEL">First Name</label>
          <input
            className="INPUT"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="FORM_FIELD">
          <label className="LABEL">Last Name</label>
          <input
            className="INPUT"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="FORM_FIELD">
          <label className="LABEL">Email</label>
          <input
            className="INPUT"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="FORM_FIELD">
          <label className="LABEL">Birth Date</label>
          <input
            className="INPUT"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <div className="FORM_FIELD">
          <label className="LABEL">Profile Image</label>
          <input className="INPUT" type="file" onChange={handleImageChange} />
        </div>
        {loading ? (
          <button className="SUBMIT_BUTTON" type="submit" disabled>
            Loading...
          </button>
        ) : (
          <button className="SUBMIT_BUTTON" type="submit">
            Update User
          </button>
        )}
      </form>
      {error && <div className="ERROR_MESSAGE">{error}</div>}
    </div>
  );
};

export default EditProfile;
