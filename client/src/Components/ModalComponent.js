import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
Modal.setAppElement("#root");

const ModalComponent = ({
  isOpen,
  onRequestClose,
  contentLabel,
  selectedItemId,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async (itemId) => {
      try {
        // 서버에서 itemId에 해당하는 상세 정보를 가져오는 요청을 보냄
        let response;
        if (contentLabel === "직원 상세 정보") {
          console.log("모달 상세아이디: ", itemId);
          response = await axios.get(
            `http://localhost:3001/employee/search/detail?employee_id=${itemId}`
          ); //직원 상세 정보 서버 요청
        } else {
          console.log("모달 상세아이디: ", itemId);
          response = await axios.get(
            `http://localhost:3001/index/search/detail/${itemId}`
          ); // 프로젝트 상세 정보 서버 요청
        }
        const selectedItemData = response.data; // 서버에서 받아온 상세 정보 데이터
        setSelectedItem(selectedItemData);
        // 선택된 항목의 데이터를 상태에 저장

        console.log("response.data: ", selectedItem);
      } catch (error) {
        console.error("에러", error);
      }
    };
    if (isOpen && selectedItemId) {
      fetchData(selectedItemId);
    }
  }, [isOpen, selectedItemId, contentLabel]);

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
          <div className="project-details">
            <p className="project-name">{selectedItem[0].project_name}</p>
            <div className="project-info">
              <div className="detailItemWrap">
                <p>프로젝트 ID</p>
                <div>{selectedItem[0].project_id}</div>
              </div>
              <div className="detailItemWrap">
                <p>시작일</p>
                <div>{selectedItem[0].start_project}</div>
              </div>
              <div className="detailItemWrap">
                <p>종료일</p>
                <div>{selectedItem[0].end_project}</div>
              </div>
              <div className="detailItemWrap">
                <p>PM</p>
                <div>{selectedItem[0].PM}</div>
              </div>
              <div className="detailItemWrap">
                <p>예산</p>
                <div>{selectedItem[0].budget}</div>
              </div>
              <div className="detailItemWrap">
                <p>개발 도구</p>
                <div>{selectedItem[0].dev_tool}</div>
              </div>
              <div className="detailItemWrap">
                <p>개발 기술</p>
                <div>{selectedItem[0].dev_skill}</div>
              </div>
              <div className="detailItemWrap">
                <p>개발 언어</p>
                <div>{selectedItem[0].dev_language}</div>
              </div>
              <div className="detailItemWrap">
                <p>고객</p>
                <div>{selectedItem[0].customer}</div>
              </div>
              <div className="detailItemWrap">
                <p>고객 담당자</p>
                <div>{selectedItem[0].customer_manager}</div>
              </div>
              <div className="detailItemWrap">
                <p>고객 전화번호</p>
                <div>{selectedItem[0].customer_phone}</div>
              </div>
              <div className="detailItemWrap">
                <p>고객 이메일</p>
                <div>{selectedItem[0].customer_email}</div>
              </div>
              <div className="detailItemWrap">
                <p>프로젝트 설명</p>
                <div>{selectedItem[0].description}</div>
              </div>
            </div>
            <div className="works-for">
            <p className="works-for-title">프로젝트 진행 직원</p>
            <div className="works-for-item-wrap">
              {selectedItem[0].works_for.map((item) => (
                <div className="works-for-item" key={item.employee_id}>
                  <p>사번: {item.employee_id}</p>
                  <p>이름: {item.employee_name}</p>
                  <p>부서: {item.dept_id}</p>
                  <p>직무: {item.job_name}</p>
                </div>
              ))}
            </div>
          </div>
          </div>

          
        </>
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 외부 배경색
        },
        content: {
          width: '30%', // 모달 너비 설정
          top: '10%', // 모달 상단 위치 설정
          left: '35%', // 모달 좌측 위치 설정
        },
      }}
    >
      {selectedItem && (
        <div className="Modal_wrap">
          {renderDetails()}
          <button onClick={onRequestClose}>닫기</button>
        </div>
      )}
    </Modal>
  );
};

export default ModalComponent;
