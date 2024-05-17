import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import './LoginForm.css';
import naglee from './naglee.png'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email.toLowerCase(), password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-content">
      <div className="login-header">
        <img alt="naglee-logo" src={naglee} />
      </div>
      <form onSubmit={handleSubmit}>
        <ul style={{color: "var(--red)"}}>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <fieldset>
          <span class="material-symbols-outlined">person</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </fieldset>
          <fieldset>
            <span class="material-symbols-outlined">lock</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </fieldset>
        <button type="submit">Log In</button>
      </form>
    </div>
    </div>
  );
}

export default LoginFormPage;
