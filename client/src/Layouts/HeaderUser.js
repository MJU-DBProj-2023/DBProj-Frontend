import React from "react";
import '../styles/style.css'
import logo from '../assets/logo.png'
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserAtom } from "../recoil/UserAtom";
import axios from "axios";
axios.defaults.withCredentials = true;

//직원 헤더
const Header = () => {
    const [user,setUser] = useRecoilState(UserAtom);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`http://localhost:3001/user/logout`);
          console.log(response.data)
          setUser([])
          navigate("/")
        } catch (error) {
          alert(error.response.data);
        }
      };
    return(
        <div>
            <div className="Header_wrap">
                <img src={logo} alt="logo"/>
                <ul className="List_wrap">
                    <li><Link to="/user/mypage">마이 페이지</Link></li>
                    <li><Link to="/user/project">프로젝트 조회</Link></li>
                    <li><Link to='/user/evaluation'>평가 조회</Link></li>
                </ul>
                <button onClick={handleSubmit}>로그아웃</button>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default Header;