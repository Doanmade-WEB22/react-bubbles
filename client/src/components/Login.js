import axios from "axios";
import React, { useState } from "react";
const Login = ({ history }) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState({ username: "", password: "" });
  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", user)
      .then(rez => {
        console.log("token test:", rez);
        localStorage.setItem("token", rez.data.payload);
        history.push("/protected");
      })
      .catch(err => console.error(err.response));
  };
  return (
    <>
      <h1 className="title">Welcome to the Bubba Sparks Bubble App!</h1>
      <br />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          value={user.username}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={user.password}
        />
        <button type="submit">Get Your Bubble On</button>
      </form>
    </>
  );
};

export default Login;
