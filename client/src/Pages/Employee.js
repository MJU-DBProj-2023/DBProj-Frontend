import React, { useState } from "react";
import axios from "axios";
import ModalComponent from "../Components/ModalComponent";
axios.defaults.withCredentials = true;

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
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(""); // 선택된 사번 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [filterLevel, setFilterLevel] = useState(""); // 필터링 개발레벨값
  const [filterSkill, setFilterSkill] = useState(""); // 필터링 스킬셋값
  const [filterJob, setFilterJob] = useState(""); // 필터링 직무값

  const dropdownHandle = (e) => {
    const selectedValue = e.target.value;
    setSelectValue(selectedValue);
  };

  const handleChange = (e) => {
    const inputText = e.target.value;
    setInputText(inputText);
    setIsSearched(false);
  };

  const handleFilterLevel = (e) => {
    const level = e.target.value;
    setFilterLevel(level);
  };

  const handleFilterSkill = (e) => {
    const skill = e.target.value;
    setFilterSkill(skill);
  };

  const handleFilterJob = (e) => {
    const job = e.target.value;
    setFilterJob(job);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText === "") {
      alert("검색어를 입력해 주세요");
    } else if (selectValue === "") {
      alert("검색 조건을 선택해 주세요");
    } else {
      try {
        const response = await axios.get(
          `http://localhost:3001/employee/search?${selectValue}=${inputText}`
        );
        const responseData = response.data;
        console.log(responseData);
        if (responseData.length === 0) {
          alert("검색 결과가 없습니다");
          // 검색 결과가 없는 경우
          setSearchResults([]); // 빈 배열로 초기화
          setIsSearched(false);
        } else {
          // 검색 결과가 있는 경우
          setSearchResults(responseData);
          setIsSearched(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openModal = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    console.log("받아온 id: ", selectedEmployeeId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
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
      <div className="FilterWrap">
        <label htmlFor="filter-level">개발 레벨:</label>
        <input
          type="text"
          id="filter-level"
          value={filterLevel}
          onChange={handleFilterLevel}
        />

        <label htmlFor="filter-skill">스킬셋:</label>
        <input
          type="text"
          id="filter-skill"
          value={filterSkill}
          onChange={handleFilterSkill}
        />

        <label htmlFor="filter-job">직책:</label>
        <input
          type="text"
          id="filter-job"
          value={filterJob}
          onChange={handleFilterJob}
        />
      </div>
      </div>
      {isSearched && (
        <div className="EmployeeWrap">
          <h1>총 {searchResults.length}명의 직원이 검색되었습니다.</h1>
        <table className="EmployeeTable">
          <thead>
            <tr>
              <th>사번</th>
              <th>이름</th>
              <th>스킬</th>
              <th>레벨</th>
              <th>직책</th>
            </tr>
          </thead>
          <tbody>
            {selectValue === "job_name"
              ? searchResults.map((result) => (
                  <tr
                    className="EmployeeItem"
                    key={result.WorksFors[0].Employee.employee_id}
                    onClick={() =>
                      openModal(result.WorksFors[0].Employee.employee_id)
                    }
                  >
                    <td>{result.WorksFors[0].Employee.employee_id}</td>
                    <td>{result.WorksFors[0].Employee.employee_name}</td>
                    <td>{result.WorksFors[0].Employee.skill_set}</td>
                    <td>{result.WorksFors[0].Employee.dev_level}</td>
                    <td>{result.job_name}</td>
                  </tr>
                ))
              : searchResults.map((result) => (
                  <tr
                    className="EmployeeItem"
                    key={result.employee_id}
                    onClick={() => {
                      openModal(result.employee_id);
                    }}
                  >
                    <td>{result.employee_id}</td>
                    <td>{result.employee_name}</td>
                    <td>{result.skill_set}</td>
                    <td>{result.dev_level}</td>
                    <td>{result.WorksFors[0].Job.job_name}</td>
                  </tr>
                ))}
          </tbody>
        </table>
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
