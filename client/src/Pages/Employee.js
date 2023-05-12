import React, {useState} from "react";

const data = [
    { id: null, value: "검색 조건 " },
    { id: "employee_id", value: "사번" },
    { id: "employee_name", value: "이름" },
    { id: "skill_set", value: "스킬셋" },
    { id: "dev_level", value: "개발 레벨" },
    { id: "job_name", value: "직책" },
  ];

const Employee = () => {
  const [selectValue, setSelectValue] = useState(null);

  const dropdownHandle = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setSelectValue(selectedValue);
  };
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
          <div className="block"></div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
