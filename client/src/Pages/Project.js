import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjComponent from "../Components/ProjComponent";
import ModalComponent from "../Components/ModalComponent";
import { useRecoilState } from "recoil";
import { UserAtom } from "../recoil/UserAtom";
axios.defaults.withCredentials = true;

const Drop = [
  { id: null, value: "검색 조건 " },
  { id: "project_id", value: "프로젝트 ID" },
  { id: "project_name", value: "프로젝트명" },
  { id: "customer", value: "발주처" },
  { id: "date", value: "날짜" },
];

const Project = () => {
  const [selectValue, setSelectValue] = useState(null); // 드롭다운 셀렉트
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 오픈
  const [selectedItemId, setSelectedItemId] = useState(null); // 프로젝트 아이디 셀렉트
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드
  const [user] = useRecoilState(UserAtom); // user 정보

  const [showInProgress, setShowInProgress] = useState(true); // 진행 중 프로젝트 보기 여부
  const [showCompleted, setShowCompleted] = useState(false); // 종료된 프로젝트 보기 여부

  const dropdownHandle = (e) => {
    const selectedValue = e.target.value;
    setSelectValue(selectedValue); // 드롭다운 상태 변경
  };

  const searchHandle = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleChange = (e) => {
    const inputText = e.target.value;
    setSearchKeyword(inputText);
  };

  const openModal = (itemId) => {
    setSelectedItemId(itemId);
    console.log(selectedItemId);
    setModalIsOpen(true);
  }; // 모달 오픈 시 프로젝트id를 itemid로 받고 모달 오픈 상태 T로 바꿈

  const closeModal = () => {
    setModalIsOpen(false);
  }; // 모달 클로즈 시 모달 오픈 상태 F로 바꿈

  const handleShowInProgress = () => {
    setShowInProgress(true);
    setShowCompleted(false);
  };

  const handleShowCompleted = () => {
    setShowInProgress(false);
    setShowCompleted(true);
  };

  const [inProgressProjects, setInProgressProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);

  const fetchData = async () => {
    try {
      if (selectValue === null) {
        alert("검색 조건을 선택해 주세요");
      } else if (searchKeyword === "") {
        alert("검색어를 입력해 주세요");
      } else {
        const response = await axios.get(
          `http://localhost:3001/index/search?${selectValue}=${searchKeyword}`
        );
        if (
          response.data.res_inProgressProjects.length !== 0 ||
          response.data.completedProjects !== 0
        ) {
          // 검색 결과가 있는 경우
          setInProgressProjects(response.data.res_inProgressProjects);
          setCompletedProjects(response.data.res_completedProjects);
          console.log(response.data);
        } else {
          alert("검색 결과가 없습니다");
          // 검색 결과가 없는 경우
          setInProgressProjects([]);
          setCompletedProjects([]); //빈배열
        }
      }
    } catch (error) {
      console.log("error name", error);
      // API 호출이 실패한 경우에도 적절한 상태 업데이트 수행
      setInProgressProjects([]);
      setCompletedProjects([]);
    }
  };

  useEffect(() => {
    const renderData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/index");
        setInProgressProjects(response.data.res_inProgressProjects);
        setCompletedProjects(response.data.res_completedProjects);
      } catch (error) {
        console.log("error name", error);
        // API 호출이 실패한 경우에도 적절한 상태 업데이트 수행
        setInProgressProjects([]);
        setCompletedProjects([]);
      }
    };
    renderData();
  }, []);

  return (
    <div>
      <div className="Search_wrap">
        <div className="dropdown_wrap">
          <select value={selectValue} onChange={dropdownHandle}>
            {Drop.map((item) => (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
        <div className="Searchkey_wrap">
          <form onSubmit={searchHandle}>
            {selectValue === "date" ? (
              <input
                type="date"
                placeholder="날짜 선택"
                className="SearchInput"
                onChange={handleChange}
              />
            ) : (
              <input
                type="text"
                placeholder="프로젝트를 검색하세요"
                className="SearchInput"
                onChange={handleChange}
              />
            )}
            <input className="SearchBtn" type="submit" value="" alt="검색" />
          </form>
          <hr style={{ width: 50 + "rem" }} />
        </div>
      </div>

      <div className="ShowProj">
        <button onClick={handleShowInProgress} className="ShowProgress">
          진행중
        </button>
        <button onClick={handleShowCompleted}>종료</button>
      </div>

      <div className="Check_Proj_wrap">
        {showInProgress && (
          <ProjComponent
            items={inProgressProjects}
            projTitle="진행중"
            openModal={openModal}
          />
        )}
        {showCompleted && (
          <ProjComponent
            items={completedProjects}
            projTitle="종료"
            openModal={openModal}
          />
        )}
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

export default Project;
