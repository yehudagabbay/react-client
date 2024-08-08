import React, { useState, useCallback } from 'react';
import avatar1 from '../public/avatar1.png';
import avatar2 from '../public/avatar2.png';
import avatar3 from '../public/avatar3.png';
import avatar4 from '../public/avatar4.png';
import avatar5 from '../public/avatar5.png';
import avatar6 from '../public/avatar6.png';
import avatar7 from '../public/avatar7.png';

import '../Css/index.css'

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7
];

const ProfileUpdate = () => {
  const [profile, setProfile] = useState({
    UserID: 2,
    UserName: '',
    Email: '',
    Phone: '',
    Password: '',
    Birthday: '',
    AvatarUrl: avatars[0],
  });

  const [errors, setErrors] = useState({});
  const [updateStatus, setUpdateStatus] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleAvatarChange = useCallback((avatar) => {
    setProfile((prevState) => ({
      ...prevState,
      AvatarUrl: avatar,
    }));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!profile.UserName) newErrors.UserName = 'Name is required';
    if (!profile.Email) newErrors.Email = 'Email is required';
    if (!profile.Password || profile.Password.length < 8) {
      newErrors.Password = 'Password must be at least 8 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateProfile = async () => {
    try {
      const response = await fetch('http://localhost:5555/api/users/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        setUpdateStatus('Profile updated successfully');
      } else {
        const errorData = await response.json();
        setUpdateStatus(`Failed to update profile: ${errorData.message}`);
      }
    } catch (error) {
      setUpdateStatus(`Error: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateProfile();
    }
  };

  const UpdateAccount = async () => {
    try {
      const response = await fetch(`http://localhost:5555/api/users/${profile.UserID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        setUpdateStatus('Profile updated successfully');
      } else {
        const errorData = await response.json();
        setUpdateStatus(`Failed to update profile: ${errorData.message}`);
      }
    } catch (error) {
      setUpdateStatus(`Error: ${error.message}`);
    }
  };
  const deleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        const response = await fetch(`http://localhost:5555/api/users/${profile.UserID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.ok) {
          setUpdateStatus('Account deleted successfully');
          // Optionnel : rediriger l'utilisateur ou réinitialiser l'état du profil
        } else {
          const errorData = await response.json();
          setUpdateStatus(`Failed to delete account: ${errorData.message}`);
        }
      } catch (error) {
        setUpdateStatus(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="profile-update">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="UserName"
            value={profile.UserName}
            onChange={handleChange}
            required
            aria-describedby="nameError"
          />
          {errors.UserName && <div id="nameError" className="error">{errors.UserName}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="Email"
            value={profile.Email}
            onChange={handleChange}
            required
            aria-describedby="emailError"
          />
          {errors.Email && <div id="emailError" className="error">{errors.Email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="Phone"
            value={profile.Phone}
            onChange={handleChange}
            pattern="05[0-9]-[0-9]{7}"
            title="Format: 05X-XXXXXXX"
            placeholder="05X-XXXXXXX"
            aria-describedby="phoneError"
          />
          {errors.Phone && <div id="phoneError" className="error">{errors.Phone}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="Password"
            value={profile.Password}
            onChange={handleChange}
            required
            minLength="8"
            title="Password must be at least 8 characters"
            aria-describedby="passwordError"
          />
          {errors.Password && <div id="passwordError" className="error">{errors.Password}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            name="Birthday"
            value={profile.Birthday}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <h4>Avatar:</h4>
          <div className="avatar-selection">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className={`avatar ${profile.AvatarUrl === avatar ? 'selected' : ''}`}
                style={{ cursor: 'pointer', width: 50, height: 50, margin: 5 }}
                onClick={() => handleAvatarChange(avatar)}
              />
            ))}
          </div>
        </div>
        <button type="submit" onClick={UpdateAccount}>Update Profile</button>
        <button type="button" onClick={deleteAccount} className="delete-button">Delete Account</button>
        {updateStatus && <div className="update-status">{updateStatus}</div>}
      </form>
    </div>
  );
};

export default ProfileUpdate;
