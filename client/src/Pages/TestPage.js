import React from "react";

const TestPage = () => {

  const Drop = [
    { id: "", value: "검색 구분" },
    { id: "project_name", value: "프로젝트명" },
    { id: "employee_name", value: "이름" },
    { id: "not_working", value: "Not Working" },
  ];
  
  
  return (
    <div>
      <div className="Test">
        <div className="TestDrop">
          <select>
            {Drop.map((item) => (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
        <div className="Searchkey_wrap">
          <form>
            <input
              type="text"
              placeholder="검색"
              className="SearchInput"
            />
            <input className="SearchBtn" type="submit" value="검색" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
