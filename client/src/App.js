import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
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
import HeaderAdmin from "./Layouts/HeaderAdmin"

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/testpage" element={<TestPage/>}/>
      {/* 경영진, 직원(임시) */}
      <Route path="/" element={<Header />}>
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/changeid" element={<ChangeID/>}/>
        <Route path="/changepw" element={<ChangePW/>}/>
        <Route path="/project" element={<Project/>}/>
        <Route path="/employee" element={<Employee/>}/>
        <Route path="/evaluation" element={<Evaluation/>}/>
      </Route>
      {/* 관리자 */}
      <Route path="/admin" element={<HeaderAdmin/>}> 
        <Route path="/admin/createproj" element={<CreateProj/>}/>
        <Route path="/admin/createuser" element={<CreateUser/>}/>
        <Route path="/admin/createeval" element={<CreateEval/>}/>
      </Route>
    </Routes>
  );
}

export default App;
