import React, { useState } from "react";
import "../styles/style.css";
import profile from "../assets/profile.jpg";
import { Link } from "react-router-dom";
import ModalComponent from "../Components/ModalComponent";
import ProjComponent from "../Components/ProjComponent";

const user_data = {
  dept_name: "박하나",
  dept_id: 60201680,
  job: "개발자",
};

const Mypage = () => {
  const [items] = useState([
    {
      project_id: "20301580",
      project_name: "박물관 큐레이터 앱",
      start_project: new Date().toISOString().split("T")[0],
      end_project: new Date().toISOString().split("T")[0],
      PM: "박하나",
      budget: 0,
      dev_tool: "vs",
      dev_skill: "spring",
      dev_language: "java",
      customer: "명지대학교 박물관",
      customer_manager: "",
      customer_phone: "",
      customer_email: "",
      description: "명지대학교에 있는 박물관을 소개하는 앱",
    },
    {
      project_id: "20301581",
      project_name: "대리운전 매칭 앱",
      start_project: new Date().toISOString().split("T")[0],
      end_project: new Date().toISOString().split("T")[0],
      PM: "박재윤",
      budget: 0,
      dev_tool: "vs",
      dev_skill: "spring",
      dev_language: "java",
      customer: "1577-1577",
      customer_manager: "",
      customer_phone: "1577-1577",
      customer_email: "",
      description: "대리운전 기사와 고객을 매칭하는 앱",
    },
  ]);

  const [empty] = useState([])

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const openModal = (itemId) => {
    setSelectedItemId(itemId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  console.log(setSelectedItemId);

  return (
    <div>
      <div className="User_wrap">
        <div className="Profile_wrap">
          <img src={profile} alt="Profile" />
          <div className="Userdata_wrap">
            <div>
              {user_data.dept_name} ({user_data.dept_id})
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
      <ProjComponent items={items} projTitle="투입" openModal={openModal} />
      <ProjComponent items={empty} projTitle="종료" openModal={openModal} />
      <ProjComponent items={empty} projTitle="평균 평점" openModal={openModal} />
      </div>
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="프로젝트 상세 정보"
        selectedItemId={selectedItemId}
        items={items}
      />
    </div>
  );
};

export default Mypage;
