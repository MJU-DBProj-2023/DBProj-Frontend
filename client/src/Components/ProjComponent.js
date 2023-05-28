import React from 'react';

const ProjComponent = ({ items, projTitle, openModal }) => {
  const itemLength = items ? items.length : 0;

  if (items === null) {
    alert("검색 결과가 없습니다.");
  }

  return (
    <div>
      <h1 className='ProjTitle'>
        {projTitle} {itemLength}
      </h1>
      <table className="ProjTable">
        <thead>
          <tr>
            <th>프로젝트 ID</th>
            <th>프로젝트 이름</th>
            <th>예산</th>
            <th>시작일</th>
            <th>종료일</th>
            <th>고객</th>
          </tr>
        </thead>
        <tbody>
          {items && items.map((item) => (
            <tr
              className="ProjItem"
              key={item.project_id}
              onClick={() => openModal(item.project_id)}
            >
              <td>{item.project_id}</td>
              <td>{item.project_name}</td>
              <td>{item.budget}</td>
              <td>{item.start_project}</td>
              <td>{item.end_project}</td>
              <td>{item.customer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjComponent;
