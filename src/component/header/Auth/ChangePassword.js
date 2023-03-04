import React, { useState } from "react";
import axios from "axios";

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/change-password`,
        {
          token: match.params.token,
          password,
        }
      );

      if (response.status === 200) {
        // Password reset successful
      }
    } catch (error) {
      setErrorMessage("Password reset failed");
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleResetPassword}>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
