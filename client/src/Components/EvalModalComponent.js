import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

const EvalModalComponent = ({ isOpen, onRequestClose, projectId }) => {
  const [evalDetails, setEvalDetails] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/eval/detail?project_id=${projectId}`
        );
        setEvalDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (isOpen && projectId) {
        fetchProjectDetails();
      }
    }, [isOpen, projectId]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      {/* 모달 내용을 추가하거나 수정하세요 */}
      {evalDetails ? (
        <div>
          <h2>평가 상세 정보</h2>
          <p>프로젝트명: {evalDetails.project_name}</p>
          
          {evalDetails.employees.map((result, employee_id) => {
            return (
                <div key={employee_id}>
                  <p>이름: {result.employee_name}</p>
                  <p>PM 평가: {result.avg_pm_score}</p>
                  <p>고객 평가: {result.avg_cus_score}</p>
                  <p>동료 평가: {result.avg_co_score}</p>
                </div>
              );
          })}
          <button onClick={onRequestClose}>닫기</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
};

export default EvalModalComponent;
