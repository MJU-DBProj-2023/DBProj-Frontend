import React, { useState } from "react";
import axios from "axios";
import "../styles/style.css";
import { UserAtom } from "../recoil/UserAtom";
import { useRecoilState } from "recoil";
axios.defaults.withCredentials = true;

const ChangeID = () => {
  const [newId, setNewId] = useState("");
  const [user, setUser] = useRecoilState(UserAtom);
  const [cuur_id, setCuur_id] = useState(user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newId === "") {
      alert("새로운 아이디를 입력해 주세요");
    } else if (newId === user.id) {
      alert("이전과 동일한 아이디입니다");
    } else {
      try {
        const response = await axios.patch(
          `http://localhost:3001/user/resetId`,
          {
            cuur_id: cuur_id,
            newId: newId,
            headers: {
              "Content-type": "application/json",
              withCredentials: true,
            },
          }
        );
        const responseData = response.data;
        alert(responseData);
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div>
      <form className="login_wrap" onSubmit={handleSubmit}>
        <div>현재 아이디: {user.id}</div>
        <input
          type="text"
          placeholder="새로운 아이디"
          name="newId"
          value={newId}
          onChange={(e) => setNewId(e.target.value)}
        />
        <button type="submit">
          아이디 변경{" "}
        </button>
      </form>
    </div>
  );
};
export default ChangeID;
