import React, {useState, useRef, useEffect} from "react";
import '../styles/style.css'
import profile from '../assets/profile.jpg'
import { Link } from "react-router-dom";

const user_data =  {
    dept_name: '박하나',
    dept_id: 60201680,
    job: '개발자'
}

const Mypage = () => {
    const [items] = useState(["박물관 큐레이터 앱", "대리운전 앱", "수주 관리 시스템", "명지대학교 학사 관리 시스템" ,"DBMS 앱", "뱅킹", "카카오", "티브이", "이브이", "주피썬더", "잠만보"]);

    const divRef = useRef()

    useEffect(() => {
        const a = divRef.current.height
        console.log(a)
    }, [])
    return(
        <div>
            <div className="User_wrap">
               <div className="Profile_wrap">
                    <img src={profile} alt="Profile"/>
                    <div className="Userdata_wrap">
                        <div>{user_data.dept_name} ({user_data.dept_id})</div>
                    <div>{user_data.job}</div>
                    </div>
                </div>
                <div className="Change_wrap">
                    <button className="Btn_changeID" >
                        <Link to="/ChangeID">아이디 변경</Link></button>
                    <button className="Btn_changePW"><Link to="/changePW">비밀번호 변경</Link></button>
                </div> 
            </div>
            <div className="Proj_wrap">
                <div className="Ing" ref={divRef}>
                    <h1>투입</h1>
                    {items.map((item, index) => (
                        <div className="Ing_list" key={index}>* {item}</div>
                    ))}
                </div>
                <div className="Done">
                    <h1>종료</h1>   
                </div>
                <div className="Rating">
                    <h1>평균 평점</h1>
                </div>
            </div>
        </div>
    )
}

export default Mypage;