import React from "react";
import '../styles/style.css'
import logo from '../assets/logo.png'
import { Link, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserAtom } from "../recoil/UserAtom";


//경영진 헤더
const Header = () => {
    const [user,setUser] = useRecoilState(UserAtom);
    return (
      <div>
        <div className="Header_wrap">
          <img src={logo} alt="logo" />
          <ul className="List_wrap">
            <li><Link to="/executive/project">프로젝트 조회</Link></li>
            <li><Link to="/executive/employee">개발자 관리</Link></li>
            <li><Link to='/executive/evaluation'>평가 조회</Link></li>
          </ul>
          <button onClick={() => { setUser([]) }}><Link to="/">로그아웃</Link></button>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    );
  };
  
  export default Header;
  