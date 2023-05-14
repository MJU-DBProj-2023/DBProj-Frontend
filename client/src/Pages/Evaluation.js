import React, { useState } from "react";

const data = [
  { id: null, value: "검색 조건 " },
  { id: "customer", value: "고객 평가" },
  { id: "colleague", value: "동료 평가" },
  { id: "pm", value: "PM 평가" },
];

const Evaluation = () => {
  const [selectValue, setSelectValue] = useState(null);

  const dropdownHandle = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setSelectValue(selectedValue);
  };

  const [items] = useState([
    "박물관 큐레이터 앱",
    "대리운전 앱",
    "수주 관리 시스템",
    "명지대학교 학사 관리 시스템",
    "DBMS 앱",
    "뱅킹",
    "카카오",
    "티브이",
    "이브이",
    "주피썬더",
    "잠만보",
  ]);

  return (
    <div>
      <div className="Search_wrap">
        <div className="dropdown_wrap">
          <select value={selectValue} onChange={dropdownHandle}>
            {data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="Eval_wrap">
        <div className="Eval">
          <h1>평가 조회</h1>
          {items.map((item, index) => (
            <div className="Ing_list" key={index}>
              * {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
