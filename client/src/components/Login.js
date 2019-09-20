import { axios } from "axios";
import React, { useState } from "react";

const Login = ({ history }) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState({ username: "", password: "" });
  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handelSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", user)
      .then(rez => {
        console.log("login", rez);
        localStorage.setItem("token", rez.data.payload);
        history.push("/protected");
      })
      .catch(errrr => console.log(errrr.response));
  };
  return (
    <>
      <h1>Welcome to the Bubba Sparks Bubble App!</h1>
      <h3>Please Login</h3>

      <form>
        <input
          name="username"
          placeholder="username"
          value={user.username}
          onChange={handleChange}
          type="text"
        />
        <input
          name="password"
          placeholder="password"
          value={user.password}
          onChange={handleChange}
          type="password"
        />
        <button type="submit">Get my Bubble On</button>
      </form>
    </>
  );
};

export default Login;
