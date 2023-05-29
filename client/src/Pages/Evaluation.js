import React, { useState, useEffect } from "react";
import axios from "axios";
import EvalModalComponent from "../Components/EvalModalComponent";
axios.defaults.withCredentials = true;

const Evaluation = () => {
  const [inputText, setInputText] = useState(""); // 검색값
  const [searchResults, setSearchResults] = useState([]); // 검색 결과
  const [selectedProjectId, setSelectedProjectId] = useState(null); // 선택된 프로젝트 ID
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 열림 여부

  const handleChange = (e) => {
    const inputText = e.target.value;
    setInputText(inputText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText === "") {
      alert("검색어를 입력해 주세요");
    } else {
      try {
        const response = await axios.get(
          `http://localhost:3001/eval/search?project_name=${inputText}`
        );
        const responseData = response.data.projectNames;
        console.log(responseData);
        if (responseData.length === 0) {
          alert("검색 결과가 없습니다");
          // 검색 결과가 없는 경우
          setSearchResults([]); // 빈 배열로 초기화
        } else {
          // 검색 결과가 있는 경우
          setSearchResults(responseData);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleModalOpen = (projectId) => {
    setSelectedProjectId(projectId);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setSelectedProjectId(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    const renderData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/eval");
        setSearchResults(response.data.projectNames);
      } catch (error) {
        console.log("error name", error);
        // API 호출이 실패한 경우에도 적절한 상태 업데이트 수행
      }
    };
    renderData();
    console.log(searchResults);
  }, []);

  return (
    <div>
      <div className="Search_wrap">
        <div className="Searchkey_wrap">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="평가를 확인할 프로젝트명을 검색하세요"
              className="SearchInput"
              onChange={handleChange}
            />
            <input className="SearchBtn" type="submit" value="" alt="검색" />
          </form>
          <hr style={{ width: 50 + "rem" }} />
        </div>
      </div>

      <div className="Eval_wrap">
        <div className="Eval">
          <table className="EvalTable">
            <thead>
              <tr>
                <th>이름</th>
                <th>고객 평가</th>
                <th>PM 평가</th>
                <th>동료 평가</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result, project_id) => (
                <tr
                  key={project_id}
                  onClick={() => handleModalOpen(result.project_id)}
                >
                  <td>{result.project_name}</td>
                  <td>{result.avg_cus_rating}</td>
                  <td>{result.avg_PM_rating}</td>
                  <td>{result.avg_co_rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EvalModalComponent
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        projectId={selectedProjectId}
      />
    </div>
  );
};

export default Evaluation;
