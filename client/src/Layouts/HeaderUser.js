import React from "react";
import '../styles/style.css'
import logo from '../assets/logo.png'
import { Link, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserAtom } from "../recoil/UserAtom";


//직원 헤더
const Header = () => {
    const [user,setUser] = useRecoilState(UserAtom);
    return(
        <div>
            <div className="Header_wrap">
                <img src={logo} alt="logo"/>
                <ul className="List_wrap">
                    <li><Link to="/user/mypage">마이 페이지</Link></li>
                    <li><Link to="/user/project">프로젝트 조회</Link></li>
                    <li><Link to='/user/evaluation'>평가 조회</Link></li>
                </ul>
                <button onClick={() => {setUser([])}}><Link to="/">로그아웃</Link></button>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default Header;