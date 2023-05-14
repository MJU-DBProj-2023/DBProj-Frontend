import React from "react";
import '../styles/style.css'
import logo from '../assets/logo.png'
import { Link, Outlet } from "react-router-dom";



const Header = () => {
    return(
        <div>
            <div className="Header_wrap">
                <img src={logo} alt="logo"/>
                <ul className="List_wrap">
                    <li><Link to="/Check_Proj">프로젝트 조회</Link></li>
                    <li><Link to="/employee">개발자 관리</Link></li>
                    <li><Link to='/evaluation'>평가 조회</Link></li>
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