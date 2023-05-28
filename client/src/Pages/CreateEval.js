import React, { useState } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;

const CreateEval = () => {
  const [formData, setFormData] = useState({
    evaluator: "",
    evaluated: "",
    project_id: "",
    Q001:0,
    Q002:0,
    Q003:0,
    Q004:0,
    Q005:0,
    Q006:0,
    Q007:0,
    Q008:0,
    Q009:0,
    Q010:0,
    Q011:0,
    Q012:0,
    Q013:0,
    Q014:0,
    Q015:0,
    Q016:0,
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 제출 동작 막는 역할 (페이지 리로드 x)
    
    axios
    .post("http://localhost:3001/admin/createEval", formData)
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

  const questionNumbers = Array.from({ length: 16 }, (_, index) => `Q${String(index + 1).padStart(3, "0")}`);

  console.log(formData)

  return (
    <div className="Form_wrap">
      <form className="Form" onSubmit={handleSubmit}>
        <label>
          평가자 (발주처명)
          <input
            type="text"
            name="evaluator"
            value={formData.evaluator}
            onChange={handleChange}
          />
        </label>
        <label>
          피평가자 (사번)
          <input
            type="text"
            name="evaluated"
            value={formData.evaluated}
            onChange={handleChange}
          />
        </label>
        <label>
          프로젝트 ID
          <input
            type="text"
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
          />
        </label>
        {questionNumbers.map((questionNumber) => (
          <label key={questionNumber}>
            {questionNumber}
            <div className="Radio_wrap">
              <label>
                전혀 그렇지않다
                <input
                  type="radio"
                  name={questionNumber}
                  value="1"
                  checked={formData[questionNumber] === '1'}
                  onChange={handleChange}
                />
              </label>
              <label>
                그렇지 않다
                <input
                  type="radio"
                  name={questionNumber}
                  value="2"
                  checked={formData[questionNumber] === '2'}
                  onChange={handleChange}
                />
              </label>
              <label>
                보통이다
                <input
                  type="radio"
                  name={questionNumber}
                  value="3"
                  checked={formData[questionNumber] === '3'}
                  onChange={handleChange}
                />
              </label>
              <label>
                그렇다
                <input
                  type="radio"
                  name={questionNumber}
                  value="4"
                  checked={formData[questionNumber] === '4'}
                  onChange={handleChange}
                />
              </label>
              <label>
                매우 그렇다
                <input
                  type="radio"
                  name={questionNumber}
                  value="5"
                  checked={formData[questionNumber] === '5'}
                  onChange={handleChange}
                />
              </label>
            </div>
          </label>
        ))}
        <button type="submit">고객 평가 등록</button>
      </form>
    </div>
  );
};

export default CreateEval;
