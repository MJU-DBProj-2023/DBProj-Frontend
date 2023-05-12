import React, { useState } from "react";
import '../styles/style.css'
import logo from '../assets/logo.png'

const Login = () => {
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")

    const LoginFunc = (e) => {
        e.preventDefault();
    }


    const realID = "hana"
    const realPW = "1111"
        

    return (
        <div>
            <div className="Header_wrap">
                <img src={logo} alt="logo"></img>
            </div>
            <form className="login_wrap" onSubmit={LoginFunc}>
                <input type="text"
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value) } />
                <input type="password" 
                placeholder="Password"
                value={pw}
                onChange={(e) => setPw(e.target.value)} />
                <button type="submit" onClick={e => {
                    if (realID === id) {
                        if (realPW === pw) {
                            alert('로그인 성공!')
                        }else {
                            alert('아이디 혹은 비밀번호가 일치하지 않습니다.')
                        }
                    } else {
                        alert('아이디 혹은 비밀번호가 일치하지 않습니다.')
                    }
                }}>로그인 </button>
            </form>
        </div>
        );
};

export default Login;