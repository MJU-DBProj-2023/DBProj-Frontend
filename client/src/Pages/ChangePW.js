import React, { useState } from "react";

const ChangePW = () => {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [checkPW, setCheckPW] = useState("");

  const formFunc = (e) => {
    e.preventDefault();
  };
  return (
    <div className="Change_PW_wrap">
      <div>
        <form className="">
          <input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button onClick={formFunc}>인증번호 발송</button>
        </form>
        <form>
          <input
            type="text"
            placeholder="인증 번호"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          ></input>
          <button onClick={formFunc}>인증번호 확인</button>
        </form>
        <form onSubmit={formFunc}>
          <input
            type="password"
            placeholder="새로운 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="새로운 비밀번호 확인"
            value={checkPW}
            onChange={(e) => setCheckPW(e.target.value)}
          ></input>
          <button
            type="submit"
            onClick={(e) => {
              if (password === "" && checkPW === "") {
                alert("입력을 확인해 주세요");
              } else if (password !== checkPW) {
                alert("비밀번호가 일치하지 않습니다");
              } else {
                alert("변경 성공!");
              }
            }}
          >
            비밀번호 변경
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePW;
