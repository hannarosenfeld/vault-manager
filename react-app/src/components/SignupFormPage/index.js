import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false); // State to track success

  if (!sessionUser.username === "admin") return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data && data.errors) { // Check if data is not null before accessing errors
        setErrors(data.errors);
      } else {
        setIsSuccess(true); // Set success state to true
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };
  

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        {isSuccess ? ( // Conditionally render success message
        <div className="success-message">
          <p>Sign-up for user <b>{username}</b> successful!</p>
          <div class="wrapper"> <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        </div>
        </div>
        ) : (
          <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
              <label>
                Email
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Username
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <label>
                Confirm Password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Sign Up</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default SignupFormPage;
