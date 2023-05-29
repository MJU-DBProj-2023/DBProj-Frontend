import React from "react";

const ProjListComponent = ({ items, projTitle, openModal }) => {
  const itemLength = items ? items.length : 0;

  if (items === null) {
    alert("검색 결과가 없습니다.");
  }

  return (
    <>
      <div className="ProjListWrap">
        <h1 className="ProjTitle">
          {projTitle} {itemLength}
        </h1>
        <div>
            
        </div>
      </div>
    </>
  );
};

export default ProjListComponent;
