import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkingDaysComponent from "../Components/WorkingDaysComponent";
import { useRecoilState } from "recoil";
import { UserAtom } from "../recoil/UserAtom";
axios.defaults.withCredentials = true;

const WorkingDays = () => {
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드
  const [isSearched, setIsSearched] = useState(false); // 결과 visible T/F
  const [user] = useRecoilState(UserAtom); // user 정보
  const [workingDays, setWorkingDays] = useState([]);

  const searchHandle = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleChange = (e) => {
    const inputText = e.target.value;
    setSearchKeyword(inputText);
  };

  const fetchData = async () => {
    try {
      if (searchKeyword === "") {
        alert("검색어를 입력해 주세요");
      } else {
        const response = await axios.get(
          `http://localhost:3001/employee/working_days?year=${searchKeyword}`
        );
        if (response.data.length !== 0) {
          // 검색 결과가 있는 경우
          setWorkingDays(response.data);
          setIsSearched(true);
          console.log(response.data);
        } else {
          alert("검색 결과가 없습니다");
          // 검색 결과가 없는 경우
          setWorkingDays([]);
          setIsSearched(false);
        }
      }
    } catch (error) {
      console.log("error name", error);
      // API 호출이 실패한 경우에도 적절한 상태 업데이트 수행
      setWorkingDays([]);
    }
  };

  return (
    <div>
      <div className="Search_wrap">
        <div className="Searchkey_wrap">
          <form onSubmit={searchHandle}>
            <input
              type="text"
              placeholder="연도를 입력해주세요"
              className="SearchInput"
              onChange={handleChange}
            />
            <input className="SearchBtn" type="submit" value="" alt="검색" />
          </form>
          <hr style={{ width: 50 + "rem" }} />
        </div>
      </div>

      <div className="Check_Proj_wrap">
        {isSearched && <WorkingDaysComponent items={workingDays} />}
      </div>
    </div>
  );
};

export default WorkingDays;
