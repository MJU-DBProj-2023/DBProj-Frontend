import React from 'react';

const ProjComponent = ({ items, projTitle, openModal }) => {
  const itemLength = items ? items.length : 0;

  if (items === null) {
    alert("검색 결과가 없습니다.")
  }

  return (
    <ul className="Ing">
      <h1> {projTitle} {itemLength}</h1>
      {items && items.map((item) => (
        <li key={item}>
          <div
            className="Ing_list"
            onClick={() => openModal(item) }
          >
            * {item}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProjComponent;
