import React, { useState } from "react";

const data = [
  { id: null, value: "검색 조건 " },
  { id: "customer", value: "발주처" },
  { id: "date", value: "날짜" },
];

const Check_Proj = () => {
  const [selectValue, setSelectValue] = useState(null);

  const dropdownHandle = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setSelectValue(selectedValue);
  };
  const [items] = useState(["박물관 큐레이터 앱", "대리운전 앱", "수주 관리 시스템", "명지대학교 학사 관리 시스템" ,"DBMS 앱", "뱅킹", "카카오", "티브이", "이브이", "주피썬더", "잠만보"]);

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
        <div className="Searchkey_wrap">
          <input placeholder="검색" />
        </div>
      </div>

      <div className="Check_Proj_wrap">
        <div className="Ing">
          <h1>투입 {items.length}</h1>
        </div>
        <div className="Done">
          <h1>종료</h1>
        </div>
      </div>
    </div>
  );
};

export default Check_Proj;
