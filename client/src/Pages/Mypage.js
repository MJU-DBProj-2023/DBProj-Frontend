import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/style.css";
import profile from "../assets/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import ModalComponent from "../Components/ModalComponent";
import ProjComponent from "../Components/ProjComponent";
import { useRecoilState } from "recoil";
import { UserAtom } from "../recoil/UserAtom";
axios.defaults.withCredentials = true;


const Mypage = () => {

  const [user, setUser] = useRecoilState(UserAtom)
  const [employee, setEmployee] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigate = useNavigate();

  const openModal = (itemId) => {
    setSelectedItemId(itemId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  console.log(user)

  useEffect(() => {
    const renderData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/mypage");
        setEmployee(response.data.employee)
      } catch (error) {
        if (error.response.status === 401) {
          alert("로그인을 진행해 주세요")
          navigate("/")        
        }
        console.log("error name", error);
        // API 호출이 실패한 경우에도 적절한 상태 업데이트 수행
      }
    };
    renderData();
  }, []);
    return (
    <div>
      <div className="User_wrap">
        <div className="Profile_wrap">
          <img src={profile} alt="Profile" />
          <div className="Userdata_wrap">
            <div>
              {employee.employee_name} ({employee.employee_id})
            </div>
            <div>{employee.position}</div>
          </div>
        </div>
        <div className="Change_wrap">
          <button className="Btn_changeID">
            <Link to="/user/ChangeID">아이디 변경</Link>
          </button>
          <button className="Btn_changePW">
            <Link to="/user/changePW">비밀번호 변경</Link>
          </button>
        </div>
      </div>
      <div className="Proj_wrap">
      <ProjComponent projTitle="진행중" openModal={openModal} />
      <ProjComponent projTitle="종료" openModal={openModal} />
      </div>
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="프로젝트 상세 정보"
        selectedItemId={selectedItemId}
      />
    </div>
  );
};

export default Mypage;
