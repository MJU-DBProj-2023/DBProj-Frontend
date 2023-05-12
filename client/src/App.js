import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
import Header from "./Layouts/Header";
import Mypage from "./Pages/Mypage";
import ChangeID from "./Pages/ChangeID";
import ChangePW from "./Pages/ChangePW";
import Check_Proj from "./Pages/Check_Proj";
import Employee from "./Pages/Employee";


const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/"element={<Header />}>
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/changeid" element={<ChangeID/>}/>
        <Route path="/changepw" element={<ChangePW/>}/>
        <Route path="/Check_Proj" element={<Check_Proj/>}/>
        <Route path="/employee" element={<Employee/>}/>
      </Route>
    </Routes>
  );
}

export default App;
