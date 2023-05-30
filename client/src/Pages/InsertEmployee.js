import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { InsertEmployeeAtom } from "../recoil/UserAtom";
import ProjComponent from "../Components/ProjComponent";
import ModalComponent from "../Components/ModalComponent";

const InsertEmployee = () => {
  const [insertEmployee, setInsertEmployee] =
    useRecoilState(InsertEmployeeAtom); // 프로젝트 투입으로 넘길 employeeID
  const [employee, setEmployee] = useState([]); // 직원 정보
  const [project, setProject] = useState([]); // 투입 가능한 프로젝트
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 오픈
  const [selectedItemId, setSelectedItemId] = useState(null); // 프로젝트 아이디 셀렉트

  const [formData, setFormData] = useState({
    employee_id: insertEmployee,
    project_id: "",
    job_code: "",
    start_work: new Date().toISOString().split("T")[0],
    end_work: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const openModal = (itemId) => {
    setSelectedItemId(itemId);
    console.log(selectedItemId);
    setModalIsOpen(true);
  }; // 모달 오픈 시 프로젝트id를 itemid로 받고 모달 오픈 상태 T로 바꿈

  const closeModal = () => {
    setModalIsOpen(false);
  }; // 모달 클로즈 시 모달 오픈 상태 F로 바꿈

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/worksfor/assgin", formData)
      .then((response) => {
        // 요청 성공 시 처리할 작업
        console.log("요청이 성공적으로 전송되었습니다.");
        console.log("응답 데이터:", response.data);
        alert("프로젝트에 직원이 투입되었습니다.");
        setInsertEmployee("")
      })
      .catch((error) => {
        // 요청 실패 시 처리할 작업
        if (error.code === "ERR_BAD_REQUEST") {
          alert(error.response.data);
        }
        console.error("요청이 실패하였습니다.", error);
      });
  };

  useEffect(() => {
    const renderData = async () => {
      try {
        console.log("직원 투입 page:", insertEmployee);
        const response = await axios.get(
          `http://localhost:3001/worksfor/assgin/:${insertEmployee}`
        );
        setEmployee(response.data.employee); // 직원 정보 설정
        setProject(response.data.project); // 투입 가능 프로젝트 설정
      } catch (error) {
        console.log("error name", error);
        // API 호출이 실패한 경우에도 적절한 상태 업데이트 수행
        setInsertEmployee("");
        setEmployee([]);
        setProject([]);
      }
    };
    renderData();
  }, []);

  return (
    <div className="InsertEmployeeWrap">
      <div className="InsertEmployeeData">
        <div className="employee-details">
          <div className="detailItemWrap">
            <p>사번</p>
            <div>{employee.employee_id}</div>
          </div>
          <div className="detailItemWrap">
            <p>이름</p>
            <div>{employee.employee_name}</div>
          </div>
          <div className="detailItemWrap">
            <p>직위</p>
            <div>{employee.employee_position}</div>
          </div>
          <div className="detailItemWrap">
            <p>부서</p>
            <div>{employee.employee_dept_id}</div>
          </div>
          <div className="detailItemWrap">
            <p>개발 레벨</p>
            <div>{employee.employee_dev_level}</div>
          </div>
          <div className="detailItemWrap">
            <p>스킬셋</p>
            <div>{employee.employee_skill_set}</div>
          </div>
        </div>
        <ProjComponent
          items={project}
          projTitle="투입 가능"
          openModal={openModal}
        />
      </div>
      <div className="Form_wrap">
        <form className="Form" onSubmit={handleSubmit}>
          <label>
            사번
            <input
              type="text"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            프로젝트 ID
            <input
              type="text"
              name="project_id"
              value={formData.project_id}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            프로젝트 투입 시작일
            <input
              type="date"
              name="start_work"
              value={formData.start_work}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            프로젝트 투입 종료일
            <input
              type="date"
              name="end_work"
              value={formData.end_work}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            직책
            <input
              type="text"
              name="job_code"
              value={formData.job_code}
              onChange={handleChange}
            ></input>
          </label>
          <button type="submit">직원 투입</button>
        </form>
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

export default InsertEmployee;
