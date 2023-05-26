import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import axios from "axios";
Modal.setAppElement('#root');


const ModalComponent = ({
  isOpen,
  onRequestClose,
  contentLabel,
  selectedItemId
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async (itemId) => {
      try {
        // 서버에서 itemId에 해당하는 상세 정보를 가져오는 요청을 보냄
        let response;
      if (contentLabel === "직원 상세 정보") {
        console.log("모달 상세아이디: ", itemId)
        response = await axios.get(`http://localhost:3001/employee/search/detail?employee_id=${itemId}`); //직원 상세 정보 서버 요청
      } else {
        response = await axios.get(`http://localhost:3001/index/${itemId}`); // 프로젝트 상세 정보 서버 요청
      }
        console.log("response.data: ", response.data)
        const selectedItemData = response.data; // 서버에서 받아온 상세 정보 데이터
        setSelectedItem(selectedItemData);
         // 선택된 항목의 데이터를 상태에 저장
        
        console.log("response.data: ", selectedItem)
      } catch (error) {
        console.error("에러", error);
      }
    };
    if (isOpen && selectedItemId) {
      fetchData(selectedItemId)
    }
  },[isOpen, selectedItemId, contentLabel]);

  const renderDetails = () => {
    if (contentLabel === "직원 상세 정보") {
      return (
        <>
          <p>사번: {selectedItem.employee_id}</p>
          <p>사원 이름: {selectedItem.employee_name}</p>
          <p>주민등록번호: {selectedItem.rrno}</p>
          <p>이메일: {selectedItem.email}</p>
          <p>최종 학력: {selectedItem.education}</p>
          <p>입사일: {selectedItem.start_employment}</p>
          <p>주소: {selectedItem.address}</p>
          <p>연봉: {selectedItem.salary}</p>
          <p>직위: {selectedItem.position}</p>
          <p>부서 ID: {selectedItem.dept_id}</p>
          <p>매니저: {selectedItem.manager}</p>
          <p>권한 코드: {selectedItem.auth_code}</p>
          <p>스킬셋: {selectedItem.skill_set}</p>
          <p>개발 레벨: {selectedItem.dev_level}</p>
          <p>연차: {selectedItem.annual}</p>
        </>
      );
    } else {
      return (
        <>
          <p>프로젝트 ID: {selectedItem.project_id}</p>
          <p>프로젝트명: {selectedItem.project_name}</p>
          <p>시작일: {selectedItem.start_project}</p>
          <p>종료일: {selectedItem.end_project}</p>
          <p>PM: {selectedItem.PM}</p>
          <p>예산: {selectedItem.budget}</p>
          <p>개발 도구: {selectedItem.dev_tool}</p>
          <p>개발 기술: {selectedItem.dev_skill}</p>
          <p>개발 언어: {selectedItem.dev_language}</p>
          <p>고객: {selectedItem.customer}</p>
          <p>고객 담당자: {selectedItem.customer_manager}</p>
          <p>고객 전화번호: {selectedItem.customer_phone}</p>
          <p>고객 이메일: {selectedItem.customer_email}</p>
          <p>프로젝트 설명: {selectedItem.description}</p>
        </>
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
    >
      {selectedItem && (
        <div className="Modal_wrap">
          <h2>{contentLabel}</h2>
          {renderDetails()}
          <button onClick={onRequestClose}>닫기</button>
        </div>
      )}
    </Modal>
  );
};

export default ModalComponent;
