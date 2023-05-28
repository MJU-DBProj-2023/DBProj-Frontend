import React, { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const CreateUser = () => {
  const [formData, setFormData] = useState({
    employee_id: "",
    employee_name: "",
    rrno: "",
    email: "",
    education: "",
    start_employment: new Date().toISOString().split("T")[0],
    address: "",
    salary: 0,
    position: "",
    dept_id: "",
    manager: "",
    auth_code: 0,
    skill_set: "",
    dev_level: 0,
    annual: 0,
  });
  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)

    axios
      .post("http://localhost:3001/admin/createUser", formData)
      .then((response) => {
        // 요청 성공 시 처리할 작업
        console.log("요청이 성공적으로 전송되었습니다.");
        console.log("응답 데이터:", response.data);
        alert("직원을 등록하였습니다.")
      })
      .catch((error) => {
        // 요청 실패 시 처리할 작업
        console.error("요청이 실패하였습니다.", error);
      });
  };

  return (
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
          사원 이름
          <input
            type="text"
            name="employee_name"
            value={formData.employee_name}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          주민등록번호
          <input
            type="text"
            name="rrno"
            value={formData.rrno}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          이메일
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          최종 학력
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          입사일
          <input
            type="date"
            name="start_employment"
            value={formData.start_employment}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          주소
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          연봉
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          직위
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          부서 ID
          <input
            type="text"
            name="dept_id"
            value={formData.dept_id}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          매니저 (사번)
          <input
            type="text"
            name="manager"
            value={formData.manager}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          권한 코드
          <input
            type="number"
            min={0}
            max={2}
            name="auth_code"
            value={formData.auth_code}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          스킬셋
          <input
            type="text"
            name="skill_set"
            value={formData.skill_set}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          개발 레벨
          <input
            type="number"
            min={0}
            max={3}
            name="dev_level"
            value={formData.dev_level}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          연차
          <input
            type="number"
            name="annual"
            value={formData.annual}
            onChange={handleChange}
          ></input>
        </label>
        <button type="submit">직원 등록</button>
      </form>
    </div>
  );
};

export default CreateUser;
