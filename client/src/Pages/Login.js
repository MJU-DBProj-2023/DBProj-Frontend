import React, { useState } from "react";
import "../styles/style.css";
import logo from "../assets/logo.png";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(`http://localhost:3001/user/login`, {
        id: e.target.id.value,
        password: e.target.password.value,
        headers: {
          "Content-type": "application/json",
          withCredentials: true,
        },
      })
      .then((response) => {
        console.log(response.data.message);
        console.log(response.data.user);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="Header_wrap">
        <img src={logo} alt="logo"></img>
      </div>
      <form className="login_wrap" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="로그인" />
        {(() => {
          if (user && (user.auth_code === 0)) {
            return <Navigate to="/user/project" />;
          }
          else if (user && (user.auth_code === 1)) {
            return <Navigate to="/executive/project" />;
          }
          else if (user && user.auth_code === 2) {
            return <Navigate to="/admin/project" />;
          } else {
            return <Navigate to="/login" />;
          }
        })()}
      </form>
    </div>
  );
};

export default Login;
