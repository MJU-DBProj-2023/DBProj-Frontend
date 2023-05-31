import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';


const WorkingDaysComponent = ({ items, year }) => {
  const itemLength = items ? items.length : 0;

  if (items === null) {
    alert("검색 결과가 없습니다.");
  }

  return (
    <div className="WorkingDaysWrap">
      <div>
        <h1 className="ProjTitle">
          검색 연도의 직원별 프로젝트 투입일 결과입니다.
        </h1>
        <table className="ProjTable">
          <thead>
            <tr>
              <th>사번</th>
              <th>이름</th>
              <th>부서</th>
              <th>프로젝트 투입일</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item) => (
                <tr key={item.employee_id}>
                  <td>{item.employee_id}</td>
                  <td>{item.employee_name}</td>
                  <td>{item.dept_id}</td>
                  <td>{item.working_days}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <BarChart width={600} height={400} data={items}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="employee_name" />
          <YAxis>
            <Label value="프로젝트 투입일" offset={-15} position="insideLeft" angle={-90} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="working_days" fill="#DF6464" />
        </BarChart>
      </div>
    </div>
  );
  
};

export default WorkingDaysComponent;
