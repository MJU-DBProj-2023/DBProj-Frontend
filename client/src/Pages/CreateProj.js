import React, { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const CreateProj = () => {
  const [formData, setFormData] = useState({
    project_id: "",
    project_name: "",
    start_project: new Date().toISOString().split("T")[0],
    end_project: new Date().toISOString().split("T")[0],
    PM: "",
    budget: 0,
    dev_tool: "",
    dev_skill: "",
    dev_language: "",
    customer: "",
    customer_manager: "",
    customer_phone: "",
    customer_email: "",
    description: "",
  });
  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/admin/createProj", formData)
      .then((response) => {
        // 요청 성공 시 처리할 작업
        console.log("요청이 성공적으로 전송되었습니다.");
        console.log("응답 데이터:", response.data);
      })
      .catch((error) => {
        // 요청 실패 시 처리할 작업
        console.error("요청이 실패하였습니다.", error);
      });
  };

  console.log(formData)
  return (
    <div className="Form_wrap">
      <form className="Form" onSubmit={handleSubmit}>
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
          프로젝트명
          <input
            type="text"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          프로젝트 착수일
          <input
            type="date"
            name="start_project"
            value={formData.start_project}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          프로젝트 종료일
          <input
            type="date"
            name="end_project"
            value={formData.end_project}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          PM
          <input
            type="text"
            name="PM"
            value={formData.PM}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          예산
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          개발 도구
          <input
            type="text"
            name="dev_tool"
            value={formData.dev_tool}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          개발 기술
          <input
            type="text"
            name="dev_skill"
            value={formData.dev_skill}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          개발 언어
          <input
            type="text"
            name="dev_language"
            value={formData.dev_language}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          발주처
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          발주처 담당자
          <input
            type="text"
            name="customer_manager"
            value={formData.customer_manager}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          발주처 담당자 전화번호
          <input
            type="text"
            name="customer_phone"
            value={formData.customer_phone}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          발주처 담당자 이메일
          <input
            type="text"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          프로젝트 설명
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></input>
        </label>
        <button type="submit">프로젝트 등록</button>
      </form>
    </div>
  );
};

export default CreateProj;
