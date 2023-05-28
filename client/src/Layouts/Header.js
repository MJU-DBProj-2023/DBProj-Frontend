import React from "react";
import '../styles/style.css'
import logo from '../assets/logo.png'
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserAtom } from "../recoil/UserAtom";
import axios from "axios";
axios.defaults.withCredentials = true;


//경영진 헤더
const Header = () => {
    const [user,setUser] = useRecoilState(UserAtom);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`http://localhost:3001/user/logout`);
          console.log(response.data)
          navigate("/")
        } catch (error) {
          alert(error.response.data);
        }
      };
    return (
      <div>
        <div className="Header_wrap">
          <img src={logo} alt="logo" />
          <ul className="List_wrap">
            <li><Link to="/executive/project">프로젝트 조회</Link></li>
            <li><Link to="/executive/employee">개발자 관리</Link></li>
            <li><Link to='/executive/evaluation'>평가 조회</Link></li>
          </ul>
          <button onClick={handleSubmit}><Link to="/">로그아웃</Link></button>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    );
  };
  
  export default Header;
  