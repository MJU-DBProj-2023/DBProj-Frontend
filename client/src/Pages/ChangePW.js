import React, { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const ChangePW = () => {
  const [email, setEmail] = useState("");
  const [statusVerification, setStatusVerification] = useState(false);
  const [verify_code, setVerify_code] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPW, setCheckPW] = useState("");

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/user/sendEmail`,
        {
          email: email,
          headers: {
            "Content-type": "application/json",
            withCredentials: true,
          },
        }
      );
      alert(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/user/verifyEmail`,
        {
          verify_code: verify_code,
          headers: {
            "Content-type": "application/json",
            withCredentials: true,
          },
        }
      );
      alert(response.data);
      if (response.status == 200) {
        setStatusVerification(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleChangePW = async (e) => {
    e.preventDefault();
    if (!statusVerification) {
      alert("이메일 본인인증을 완료해주세요");
    }
    try {
      if (currPassword === "" && newPassword === "" && checkPW === "") {
        alert("입력을 확인해 주세요");
      } else if (newPassword !== checkPW) {
        alert("새로 입력한 비밀번호가 일치하지 않습니다");
      } else {
      }
      const response = await axios.patch(`http://localhost:3001/user/resetPW`, {
        currPassword: currPassword,
        newPassword: newPassword,
        headers: {
          "Content-type": "application/json",
          withCredentials: true,
        },
      });
      alert(response.data);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="Change_PW_wrap">
      <div>
        <h3 className="change_pw_title">비밀번호 변경</h3>
        <form onSubmit={handleEmail}>
          <h3 className="change_pw_subtitle">
            *이메일 본인인증을 진행해주세요
          </h3>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button className="change_pw_submit" type="submit">
            인증번호 발송
          </button>
        </form>
        <form onSubmit={handleVerifyEmail}>
          <input
            type="text"
            placeholder="인증 번호"
            value={verify_code}
            onChange={(e) => setVerify_code(e.target.value)}
          ></input>
          <button className="change_pw_submit" type="submit">
            인증번호 확인
          </button>
        </form>
        <form onSubmit={handleChangePW}>
          <input
            type="password"
            placeholder="현재 비밀번호"
            value={currPassword}
            onChange={(e) => setCurrPassword(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="새로운 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="새로운 비밀번호 확인"
            value={checkPW}
            onChange={(e) => setCheckPW(e.target.value)}
          ></input>
          <button className="change_pw_submit" type="submit">
            비밀번호 변경
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePW;
