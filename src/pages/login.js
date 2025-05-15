import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../components/inputField';
import Message from '../components/message';
import "../styles/login.css";
import ParticlesComponent from '../components/particles';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const [unsuccessfulMessage, setUnsuccessfulMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', response.data.username);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.error || 'Login error');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("verified") === "true") {
      setSuccessMessage("Email successfully verified. You can now log in.");
    } else if (params.get("verified") === "false") {
      setUnsuccessfulMessage("You need to verify your email to log in.");
    }
  }, [location]);

  return (
    <>
      <ParticlesComponent id="particles" />
      <div className="login-container">
          <h2 className='login-heading'>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <InputField
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login"
              />
              <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login"
              />
              <button type="submit" className="login-button">Login</button>
              <button type="button" onClick={() => navigate('/register')} className="login-register-button">Register</button>
            </form>
      <Message type="success" text={successMessage} />
      <Message type="error" text={unsuccessfulMessage} />
      </div>
    </>
  );
}
