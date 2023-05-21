import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProjComponent from "../Components/ProjComponent";
import ModalComponent from "../Components/ModalComponent";

const Drop = [
  { id: null, value: "검색 조건 " },
  { id: "customer", value: "발주처" },
  { id: "date", value: "날짜" },
];

const Project = () => {
  const [selectValue, setSelectValue] = useState(null); // 드롭다운 셀렉트
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 오픈
  const [selectedItemId, setSelectedItemId] = useState(null); // 프로젝트 이름 셀렉트
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드

  const dropdownHandle = (e) => {
    const selectedValue = e.target.value;
    setSelectValue(selectedValue); // 드롭다운 상태 변경
  };

  const searchHandle = (e) => {
    e.preventDefault();
    fetchData();
  };

  const openModal = (itemId) => {
    setSelectedItemId(itemId);
    setModalIsOpen(true);
  }; // 모달 오픈 시 프로젝트id를 itemid로 받고 모달 오픈 상태 T로 바꿈

  const closeModal = () => {
    setModalIsOpen(false);
  }; // 모달 클로즈 시 모달 오픈 상태 F로 바꿈

  const [projectNames, setProjectNames] = useState([]);
  const [completedProjectNames, setCompletedProjectNames] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      let url = "http://localhost:3001/index";
      if (selectValue === 'customer') {
        url += `/search?customer=${searchKeyword}`;
      } else if (selectValue === 'date') {
        url += `/search?date=${searchKeyword}`;
      }
      const response = await axios.get(url);
      setProjectNames(response.data[0]);
      setCompletedProjectNames(response.data[1]);
    } catch (error) {
      console.log("error name", error);
    }
  }, [selectValue, searchKeyword]);

  
  useEffect(() => {
    fetchData();
  },[fetchData]);

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
            <input type="text" placeholder="검색" className="SearchInput" onChange={() => {setSearchKeyword()}} />
            <input className="SearchBtn" type="submit" value="검색" />
          </form>
        </div>
      </div>

      <div className="Check_Proj_wrap">
        <ProjComponent
          items={projectNames}
          projTitle="투입"
          openModal={openModal}
        />
        <ProjComponent
          items={completedProjectNames}
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

export default Project;
