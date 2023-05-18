import React from "react";
import Modal from "react-modal";
Modal.setAppElement("#root"); // 추가

const ModalComponent = ({
  isOpen,
  onRequestClose,
  contentLabel,
  selectedItemId,
  items,
}) => {
  const selectedItem = items.find((item) => item.project_id === selectedItemId);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
    >
      {selectedItem && (
        <div className="Modal_wrap">
          <h2>{contentLabel}</h2>
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
          <button onClick={onRequestClose}>닫기</button>
        </div>
      )}
    </Modal>
  );
};

export default ModalComponent;
