import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../components/inputField';
import Message from '../components/message';
import "../styles/register.css";
import ParticlesComponent from '../components/particles';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      setError('Username, password and email are required');
      return;
    }
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/register', { username, password, email });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('email', response.data.email);

      setSuccessMessage(response.data.message);
      setError('');

      setTimeout(() => {
        navigate('/login?verified=false');
      }, 7000);

    } catch (error) {
      setError(error.response?.data?.error || 'Error registering user');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <ParticlesComponent id="particles" />
      <div className='register-location'>
        <h2 className="register-heading">Register</h2>
        <div className="register-container">
          <form onSubmit={handleSubmit} className="register-form">
            <InputField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="register"
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register"
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register"
            />
            <div className="register-buttons">
              <button type="submit" className="register-submit-button">Register</button>
              <button type="button" onClick={() => navigate('/login')} className="register-login-button">Login</button>
            </div>
          </form>
        </div>
        <Message type="success" text={successMessage} />
        <Message type="error" text={error} />
      </div>

    </>
  );
}
