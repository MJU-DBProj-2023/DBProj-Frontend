import React from "react";
import '../styles/style.css'
import logo from '../assets/logo.png'
import { Link, Outlet } from "react-router-dom";


//관리자 헤더
const Header = () => {
    return(
        <div>
            <div className="Header_wrap">
                <img src={logo} alt="logo"/>
                <ul className="List_wrap">
                    <li><Link to="/project">프로젝트 조회</Link></li>
                    <li><Link to="/admin/CreateProj">프로젝트 등록</Link></li>
                    <li><Link to='/admin/CreateUser'>개발자 등록</Link></li>
                    <li><Link to='/admin/CreateEval'>고객평가 등록</Link></li>
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