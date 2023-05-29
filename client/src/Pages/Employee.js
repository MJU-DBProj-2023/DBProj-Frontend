import React, { useState } from "react";
import axios from "axios";
import ModalComponent from "../Components/ModalComponent";
axios.defaults.withCredentials = true;

const Drop = [
  { id: "", value: "검색 구분 " },
  { id: "all", value: "전체 검색" },
  { id: "employee_name", value: "사원명" },
  { id: "project_name", value: "프로젝트명" },
  { id: "not_working", value: "Not Working" },
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
  const [filterJob, setFilterJob] = useState(""); // 필터링 직책값

  const dropdownHandle = (e) => {
    const selectedValue = e.target.value;
    setSelectValue(selectedValue);
  }; // 드롭다운 핸들

  const handleChange = (e) => {
    const inputText = e.target.value;
    setInputText(inputText);
    setIsSearched(false);
  }; // input 값 핸들

  const handleFilterLevel = (e) => {
    const level = e.target.value;
    setFilterLevel(level);
  }; // 개발레벨

  const handleFilterSkill = (e) => {
    const skill = e.target.value;
    setFilterSkill(skill);
  }; // 스킬셋

  const handleFilterJob = (e) => {
    const job = e.target.value;
    setFilterJob(job);
  }; // 직책

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectValue === "") {
      alert("검색 구분을 선택해 주세요"); // 검색 구분 미선택
    } else {
      if (selectValue !== "all" && selectValue !== "not_working") {
        if (inputText === "") {
          alert("검색어를 입력해 주세요"); // 프로젝트명, 사원명 구분 선택 시 text 미입력
        } else {
          try {
            const response = await axios.get(
              `http://localhost:3001/employee/search?${selectValue}=${inputText}&skill_set=${filterSkill}&job_name=${filterJob}&dev_level=${filterLevel}`
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
      } else {
        try {
          let response;
          if (selectValue === "all") {
            // 검색 구분 전체 검색 선택
            response = await axios.get(
              `http://localhost:3001/employee/search?skill_set=${filterSkill}&job_name=${filterJob}&dev_level=${filterLevel}`
            );
          } else {
            response = await axios.get(
              // 검색 구분 not working 선택
              `http://localhost:3001/employee/search?not_working=true`
            );
          }

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
      <div className="SearchBox">
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
                placeholder="개발자를 검색하세요"
                className="SearchInput"
                onChange={handleChange}
                readOnly={
                  selectValue === "all" || selectValue === "not_working"
                }
              />
              <input className="SearchBtn" type="submit" value="" alt="검색" />
            </form>
            <hr style={{ width: 50 + "rem" }} />
          </div>
        </div>
        {selectValue !== "not_working" && (
          <div className="FilterWrap">
            <div className="LevelLabel">
              <input
                type="number"
                min={1}
                max={3}
                placeholder="개발 레벨"
                value={filterLevel}
                onChange={handleFilterLevel}
              />
            </div>

            <div className="SkillLabel">
              <input
                type="text"
                placeholder="Skill set"
                value={filterSkill}
                onChange={handleFilterSkill}
              />
            </div>

            <div className="JobLabel">
              <input
                type="text"
                value={filterJob}
                placeholder="직책"
                onChange={handleFilterJob}
              />
            </div>
          </div>
        )}
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
              {searchResults.map((result) => (
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
                  <td>{Array.from(new Set(result.job_name)).join(", ")}</td>
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
