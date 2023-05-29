import React from "react";

const ProjListComponent = ({ items, projTitle, openModal }) => {
  const itemLength = items ? items.length : 0;

  if (items === null) {
    alert("검색 결과가 없습니다.");
  }

  console.log(items);

  return (
    <>
      <div className="ProjListWrap">
        <h1 className="Proj-Title">
          {projTitle} {itemLength}
        </h1>
        {items &&
          items.map((item) => (
            <div
              className="ProjItem"
              key={item.project_id}
              onClick={() => openModal(item.project_id)}
            >
              <div>{item.project_name}</div>
              <div className="ProjAvg">{item.avg}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProjListComponent;
