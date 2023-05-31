import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/style.css";
import profile from "../assets/profile_icon.png";
import { Link, useNavigate } from "react-router-dom";
import ModalComponent from "../Components/ModalComponent";
import ProjListComponent from "../Components/ProjListComponent";
import { useRecoilState } from "recoil";
import { UserAtom } from "../recoil/UserAtom";
axios.defaults.withCredentials = true;

const positionMap = {
  P01: "최고경영자",
  P02: "사장",
  P03: "부사장",
  P04: "부장",
  P05: "차장",
  P06: "과장",
  P07: "주임",
  P08: "대리",
  P09: "사원",
};

const Mypage = () => {
  const [user, setUser] = useRecoilState(UserAtom);
  const [employee, setEmployee] = useState({});
  const [allAvg, setAllAvg] = useState();
  const [onGoingProj, setOnGoingProj] = useState([]);
  const [completedProj, setCompletedProj] = useState([]);
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

  console.log(user);

  useEffect(() => {
    const renderData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/mypage");
        console.log(response.data);
        setEmployee(response.data.employee);
        setOnGoingProj(response.data.ongoingProjects);
        setCompletedProj(response.data.completedProjects);
        setAllAvg(response.data.all_avg[0]);
      } catch (error) {
        if (error.response.status === 401) {
          alert("로그인을 진행해 주세요");
          setUser([]);
          navigate("/");
        }
        console.log("error name", error);
        // API 호출이 실패한 경우에도 적절한 상태 업데이트 수행
      }
    };
    renderData();
  }, []);
  // const renderStarIcons = (rating) => {
  //   const filledStars = Math.round(rating); // 평점에 따라 채워진 별의 개수를 결정
  //   const emptyStars = 5 - filledStars; // 남은 빈 별의 개수를 결정

  //   const starIcons = [];

  //   // 채워진 별 아이콘 추가
  //   for (let i = 0; i < filledStars; i++) {
  //     starIcons.push(<span key={i}>★</span>);
  //   }

  //   // 빈 별 아이콘 추가
  //   for (let i = 0; i < emptyStars; i++) {
  //     starIcons.push(<span key={filledStars + i}>☆</span>);
  //   }

  //   return starIcons;
  // };

  return (
    <div>
      <div className="Mypage_title_wrap">
        <div className="Mypage_title">마이페이지</div>
        <div className="Mypage_title_desc">귀하의 개인정보를 관리하세요.</div>
      </div>
      <div className="User_wrap">
        <div className="Profile_wrap">
          <img src={profile} alt="Profile" />

          <div className="Userdata_wrap">
            <div>
              {employee.employee_name} ({employee.employee_id})
            </div>
            <div>
              {employee.position} {positionMap[employee.position]}
            </div>
          </div>
          {allAvg && (
            <div className="AllAvgWrap">
            {/* <div className="star_rating_fill">{renderStarIcons(allAvg)}</div> */}
            
            <div><p>나의 평균 평점</p>{allAvg.all_avg}</div>
          </div>
          )}
          
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
        <ProjListComponent
          items={onGoingProj}
          projTitle="진행중"
          openModal={openModal}
        />
        <ProjListComponent
          items={completedProj}
          projTitle="종료"
          openModal={openModal}
        />
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
