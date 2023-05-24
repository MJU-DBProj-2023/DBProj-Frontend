import React from "react";
import '../styles/style.css'
import logo from '../assets/logo.png'
import { Link, Outlet } from "react-router-dom";


//직원 헤더
const Header = () => {
    return(
        <div>
            <div className="Header_wrap">
                <img src={logo} alt="logo"/>
                <ul className="List_wrap">
                    <li><Link to="/user/mypage">마이 페이지</Link></li>
                    <li><Link to="/user/project">프로젝트 조회</Link></li>
                    <li><Link to='/user/evaluation'>평가 조회</Link></li>
                </ul>
                <button><Link to="/login">로그아웃</Link></button>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default Header;