import { useState } from "react";
import axios from "axios";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  return (
    <div>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button
        onClick={() => {
          axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/user/forgot-password`, {
              email: email,
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        GỬI YÊU CẦU
      </button>
    </div>
  );
}

export default ForgotPassword;
