import React, { useState } from "react";
import axios from "axios";
import ModalComponent from "../Components/ModalComponent";

const Drop = [
  { id: "", value: "검색 조건 " },
  { id: "employee_id", value: "사번" },
  { id: "employee_name", value: "이름" },
  { id: "skill_set", value: "스킬셋" },
  { id: "dev_level", value: "개발 레벨" },
  { id: "job_name", value: "직책" },
];

const Employee = () => {
  const [selectValue, setSelectValue] = useState(""); //드롭다운값
  const [inputText, setInputText] = useState(""); // 검색값
  const [searchResults, setSearchResults] = useState([]); // 검색 결과
  const [isSearched, setIsSearched] = useState(false); // 결과 visible T/F
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // 선택된 사번 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태

  const dropdownHandle = (e) => {
    const selectedValue = e.target.value;
    setSelectValue(selectedValue);
  };

  const handleChange = (e) => {
    const inputText = e.target.value;
    setInputText(inputText);
    setIsSearched(false)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText === "") {
      alert("검색어를 입력해 주세요")
    } else if (selectValue === "") {
      alert("검색 조건을 선택해 주세요")
    } else {
      try {
        const response = await axios.get(
          `http://localhost:3001/employee/search?${selectValue}=${inputText}`
        );
        console.log(response.data)
        setSearchResults(response.data); // 검색 결과를 상태로 설정
        if (searchResults.length !== 0 ) {
          setIsSearched(true); // 검색을 수행했음을 표시
        }else {
          alert("검색 결과가 없습니다!")
          setSearchResults([])
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  const openModal = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="검색"
              className="SearchInput"
              onChange={handleChange}
            />
            <input className="SearchBtn" type="submit" value="검색" />
          </form>
        </div>
      </div>
      {isSearched && (
        <div>
          {selectValue === "job_name"
            ? searchResults.map((result) => (
                <div
                  key={result.WorksFors[0].Employee.employee_id}
                  onClick={() =>
                    openModal(result.WorksFors[0].Employee.employee_id)
                  }
                >
                  <p>사번: {result.WorksFors[0].Employee.employee_id}</p>
                  <p>이름: {result.WorksFors[0].Employee.employee_name}</p>
                  <p>스킬: {result.WorksFors[0].Employee.skill_set}</p>
                  <p>레벨: {result.WorksFors[0].Employee.dev_level}</p>
                  <p>직책: {result.job_name}</p>
                </div>
              ))
            : searchResults.map((result) => (
                <div
                  key={result.employee_id}
                  onClick={() => openModal(result.employee_id)}
                >
                  <p>사번: {result.employee_id}</p>
                  <p>이름: {result.employee_name}</p>
                  <p>스킬: {result.skill_set}</p>
                  <p>레벨: {result.dev_level}</p>
                  <p>직책: {result.WorksFors[0].Job.job_name}</p>
                </div>
              ))}
        </div>
      )}
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="직원 상세 정보"
        selectedItemId={selectedEmployeeId}
      />
    </div>
  );
};

export default Employee;
