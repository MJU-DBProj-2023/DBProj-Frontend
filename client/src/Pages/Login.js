import React, { useEffect, useState } from "react";
import "../styles/style.css";
import logo from "../assets/logo.png";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserAtom } from "../recoil/UserAtom";
import { useRecoilState } from "recoil";
axios.defaults.withCredentials = true;

const Login = () => {
  axios.defaults.withCredentials = true;
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(UserAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await axios.post(`http://localhost:3001/user/login`, {
        id: e.target.id.value,
        password: e.target.password.value,
        headers: {
          "Content-type": "application/json",
          withCredentials: true,
        },
      });
      if (response.data.user) {
        alert(response.data.message);
        console.log(response.data.user);
        setUser(response.data.user);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(()=>{
    setUser([])
  },[])

  return (
    <div>
      <div className="Header_wrap">
        <img src={logo} alt="logo"></img>
      </div>
      <h1 className="login_title">로그인</h1>
      <form className="login_wrap" onSubmit={handleSubmit}>
        <input
          className="login_input"
          type="text"
          placeholder="아이디"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          className="login_input"
          type="password"
          placeholder="비밀번호"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="login_submit" type="submit" value="로그인" />
        {(() => {
          if (user && user.auth_code === 0) {
            return <Navigate to="/user/project" />;
          } else if (user && user.auth_code === 1) {
            return <Navigate to="/executive/project" />;
          } else if (user && user.auth_code === 2) {
            return <Navigate to="/admin/project" />;
          } else {
            return <Navigate to="/" />;
          }
        })()}
      </form>
    </div>
  );
};

export default Login;
