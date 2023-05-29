import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import ProjListComponent from "./ProjListComponent";
Modal.setAppElement("#root");

const ModalComponent = ({
  isOpen,
  onRequestClose,
  contentLabel,
  selectedItemId,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 오픈
  const [selectedItemID, setSelectedItemID] = useState(null); // 프로젝트 

  const openModal = (itemId) => {
    setSelectedItemID(itemId);
    console.log(selectedItemId);
    setModalIsOpen(true);
  }; // 모달 오픈 시 프로젝트id를 itemid로 받고 모달 오픈 상태 T로 바꿈

  const closeModal = () => {
    setModalIsOpen(false);
  }; // 모달 클로즈 시 모달 오픈 상태 F로 바꿈

  useEffect(() => {
    const fetchData = async (itemId) => {
      try {
        // 서버에서 itemId에 해당하는 상세 정보를 가져오는 요청을 보냄
        let response;
        if (contentLabel === "직원 상세 정보") {
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

        console.log("서버에서 받아 온 상세 정보", selectedItemData);
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
          <div className="employee-details">
            <h1>{contentLabel}</h1>
            <div className="detailItemWrap">
              <p>사번</p>
              <div>{selectedItem.employee.employee_id}</div>
            </div>
            <div className="detailItemWrap">
              <p>사원명</p>
              <div>{selectedItem.employee.employee_name}</div>
            </div>
            <div className="detailItemWrap">
              <p>주민등록번호</p>
              <div>{selectedItem.employee.rrno}</div>
            </div>
            <div className="detailItemWrap">
              <p>이메일</p>
              <div>{selectedItem.employee.email}</div>
            </div>
            <div className="detailItemWrap">
              <p>최종 학력</p>
              <div>{selectedItem.employee.education}</div>
            </div>
            <div className="detailItemWrap">
              <p>입사일</p>
              <div>{selectedItem.employee.start_employment}</div>
            </div>
            <div className="detailItemWrap">
              <p>주소</p>
              <div>{selectedItem.employee.address}</div>
            </div>
            <div className="detailItemWrap">
              <p>연봉</p>
              <div>{selectedItem.employee.salary}</div>
            </div>
            <div className="detailItemWrap">
              <p>직위</p>
              <div>{selectedItem.employee.position}</div>
            </div>
            <div className="detailItemWrap">
              <p>부서</p>
              <div>{selectedItem.employee.dept_id}</div>
            </div>
            <div className="detailItemWrap">
              <p>권한 코드</p>
              <div>{selectedItem.employee.auth_code}</div>
            </div>
            <div className="detailItemWrap">
              <p>매니저</p>
              <div>{selectedItem.employee.manager}</div>
            </div>
            <div className="detailItemWrap">
              <p>스킬셋</p>
              <div>{selectedItem.employee.skill_set}</div>
            </div>
            <div className="detailItemWrap">
              <p>개발 레벨</p>
              <div>{selectedItem.employee.dev_level}</div>
            </div>
            <div className="detailItemWrap">
              <p>연차</p>
              <div>{selectedItem.employee.annual}</div>
            </div>
          </div>
          <div className="Proj_wrap">
            <ProjListComponent
              items={selectedItem.ongoingProjects}
              openModal={openModal}
              projTitle="진행중"
            />
            <ProjListComponent
              items={selectedItem.completedProjects}
              projTitle="종료"
              openModal={openModal}
            />
            <ModalComponent
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="프로젝트 상세 정보"
              selectedItemId={selectedItemID}
            />
          </div>
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
                <div>{selectedItem[0].pm}</div>
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
                {Object.keys(selectedItem[0].works_for).length === 0 ? (
                  <p>프로젝트 진행 직원이 없습니다.</p>
                ) : (
                  selectedItem[0].works_for.map((item) => (
                    <div className="works-for-item" key={item.employee_id}>
                      <p>사번: {item.employee_id}</p>
                      <p>이름: {item.employee_name}</p>
                      <p>부서: {item.dept_id}</p>
                      <p>직무: {item.job_name}</p>
                    </div>
                  ))
                )}
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
          backgroundColor: "rgba(0, 0, 0, 0.5)", // 모달 외부 배경색
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
