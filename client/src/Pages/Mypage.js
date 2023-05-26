import React, { useState } from "react";
import "../styles/style.css";
import profile from "../assets/profile.jpg";
import { Link } from "react-router-dom";
import ModalComponent from "../Components/ModalComponent";
import ProjComponent from "../Components/ProjComponent";
import { useRecoilState } from "recoil";
import { UserAtom } from "../recoil/UserAtom";

const user_data = {
  dept_name: "박하나",
  dept_id: 60201680,
  job: "개발자",
};

const Mypage = () => {

  const [empty] = useState([])
  const [user, setUser] = useRecoilState(UserAtom)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const openModal = (itemId) => {
    setSelectedItemId(itemId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  console.log(user)
  return (
    <div>
      <div className="User_wrap">
        <div className="Profile_wrap">
          <img src={profile} alt="Profile" />
          <div className="Userdata_wrap">
            <div>
              {user_data.dept_name} ({user.id})
            </div>
            <div>{user_data.job}</div>
          </div>
        </div>
        <div className="Change_wrap">
          <button className="Btn_changeID">
            <Link to="/ChangeID">아이디 변경</Link>
          </button>
          <button className="Btn_changePW">
            <Link to="/changePW">비밀번호 변경</Link>
          </button>
        </div>
      </div>
      <div className="Proj_wrap">
      <ProjComponent items={empty} projTitle="투입" openModal={openModal} />
      <ProjComponent items={empty} projTitle="종료" openModal={openModal} />
      <ProjComponent items={empty} projTitle="평균 평점" openModal={openModal} />
      </div>
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="프로젝트 상세 정보"
        selectedItemId={selectedItemId}
        items={empty}
      />
    </div>
  );
};

export default Mypage;
