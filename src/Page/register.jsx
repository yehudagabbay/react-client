import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    Password: '',
    Phone: '',
    Birthday: '',
  });
  //אוביקט להעברת המשתמש לעמוד אחר לאחר הרישום
  const navigate = useNavigate();
//פונקציה אחת לתפיסת שינויים בטופס
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("בדיקה 1")
    e.preventDefault();// מיותר
      console.log("בדיקה 2" ,formData);
    // יצירת חיבור לשרת
    const response = await fetch('http://localhost:5555/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    console.log("תגובה מהשרת ", response)

    if (response.ok) {
      console.log("הרישום הצליח")
      navigate('/login');
    } else {
      console.error('שגיאה בשליחת הנתונים לשרת:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="UserName"
          value={formData.UserName}
          onChange={handleChange}
          placeholder="UserName"
          required
        />
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
        <input
          type="text"
          name="Phone"
          value={formData.Phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <input
          type="date"
          name="Birthday"
          value={formData.Birthday}
          onChange={handleChange}
          placeholder="Birthday"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
