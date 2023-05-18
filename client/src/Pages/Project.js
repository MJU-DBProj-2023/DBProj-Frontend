import React, { useState } from "react";
import ProjComponent from "../Components/ProjComponent";
import ModalComponent from "../Components/ModalComponent";

const data = [
  { id: null, value: "검색 조건 " },
  { id: "customer", value: "발주처" },
  { id: "date", value: "날짜" },
];

const Project = () => {
  const [selectValue, setSelectValue] = useState(null);

  const dropdownHandle = (e) => {
    const selectedValue = e.target.value;
    setSelectValue(selectedValue);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const openModal = (itemId) => {
    setSelectedItemId(itemId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  const [items] = useState([
    {
      project_id: "20301580",
      project_name: "박물관 큐레이터 앱",
      start_project: new Date().toISOString().split("T")[0],
      end_project: new Date().toISOString().split("T")[0],
      PM: "박하나",
      budget: 0,
      dev_tool: "vs",
      dev_skill: "spring",
      dev_language: "java",
      customer: "명지대학교 박물관",
      customer_manager: "",
      customer_phone: "",
      customer_email: "",
      description: "명지대학교에 있는 박물관을 소개하는 앱",
    },
    {
      project_id: "20301581",
      project_name: "대리운전 매칭 앱",
      start_project: new Date().toISOString().split("T")[0],
      end_project: new Date().toISOString().split("T")[0],
      PM: "박재윤",
      budget: 0,
      dev_tool: "vs",
      dev_skill: "spring",
      dev_language: "java",
      customer: "1577-1577",
      customer_manager: "",
      customer_phone: "1577-1577",
      customer_email: "",
      description: "대리운전 기사와 고객을 매칭하는 앱",
    },
  ]);

  return (
    <div>
      <div className="Search_wrap">
        <div className="dropdown_wrap">
          <select value={selectValue} onChange={dropdownHandle}>
            {data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
        <div className="Searchkey_wrap">
          <input placeholder="검색" />
        </div>
      </div>

      <div className="Check_Proj_wrap">
      <ProjComponent items={items} projTitle="투입" openModal={openModal} />
      <ProjComponent items={items} projTitle="종료" openModal={openModal} />
      </div>
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="프로젝트 상세 정보"
        selectedItemId={selectedItemId}
        items={items}
      />
    </div>
  );
};

export default Project;
