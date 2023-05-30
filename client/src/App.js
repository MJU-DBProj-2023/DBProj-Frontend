import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Header from "./Layouts/Header";
import Mypage from "./Pages/Mypage";
import ChangeID from "./Pages/ChangeID";
import ChangePW from "./Pages/ChangePW";
import Project from "./Pages/Project";
import Employee from "./Pages/Employee";
import Evaluation from "./Pages/Evaluation";
import CreateProj from "./Pages/CreateProj";
import CreateUser from "./Pages/CreateUser";
import CreateEval from "./Pages/CreateEval";
import TestPage from "./Pages/TestPage";
import HeaderAdmin from "./Layouts/HeaderAdmin";
import HeaderUser from "./Layouts/HeaderUser";
import WorkingDays from "./Pages/WorkingDays";
import InsertEmployee from "./Pages/InsertEmployee";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/testpage" element={<TestPage />} />
      {/* 직원 user */}
      <Route path="/user" element={<HeaderUser />}>
        <Route path="/user/mypage" element={<Mypage />} />
        <Route path="/user/project" element={<Project />} />
        <Route path="/user/evaluation" element={<Evaluation />} />
        <Route path="/user/changeid" element={<ChangeID />} />
        <Route path="/user/changepw" element={<ChangePW />} />
      </Route>
      {/* 경영진 executive */}
      <Route path="/executive" element={<Header />}>
        <Route path="/executive/project" element={<Project />} />
        <Route path="/executive/employee" element={<Employee />} />
        <Route path="/executive/evaluation" element={<Evaluation />} />
        <Route path="/executive/workingdays" element={<WorkingDays />} />
        <Route path="/executive/insertEmployee" element={<InsertEmployee />} />
      </Route>
      {/* 관리자 admin */}
      <Route path="/admin" element={<HeaderAdmin />}>
        <Route path="/admin/project" element={<Project />} />
        <Route path="/admin/createproj" element={<CreateProj />} />
        <Route path="/admin/createuser" element={<CreateUser />} />
        <Route path="/admin/createeval" element={<CreateEval />} />
      </Route>
    </Routes>
  );
};

export default App;
