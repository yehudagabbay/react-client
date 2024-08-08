import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ Email: '', Password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Réinitialiser les erreurs avant de soumettre

    try {
      const response = await fetch('http://localhost:5555/api/users/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const user = {
          UserID : data.UserID,
          UserName: data.UserName,
          Email: data.Email,
          Password: data.Password,
          Phone: data.Phone,
          Birthday: data.Birthday,
          AvatarUrl: data.AvatarUrl,
        };
        localStorage.setItem('token', data.token);
        localStorage.setItem('UserName', data.user.UserName); 
        localStorage.setItem('Email', data.user.Email);
        localStorage.setItem('user_now', user);
        localStorage.setItem('Birthday', data.user.Birthday);
        localStorage.setItem('AvatarUrl', data.user.AvatarUrl);
        localStorage.setItem('UserID',data.user.UserID);

        console.log(data.user.UserName);

        navigate('/profile');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Échec de la connexion');
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer plus tard.'+ err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="Password"
          value={formData.Password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
