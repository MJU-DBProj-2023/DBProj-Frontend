import React from "react";

const CreateProj = () =>  {
    return(
        <div className="Form_wrap">
            <form  className="Form">
                <label>
                    프로젝트 ID
                    <input></input>
                </label>
                <label>
                    프로젝트명
                    <input></input>
                </label>
                <label>
                    프로젝트 착수일
                    <input></input>
                </label>
                <label>
                    프로젝트 종료일
                    <input></input>
                </label>
                <label>
                    PM
                    <input></input>
                </label>
                <label>
                    예산
                    <input></input>
                </label>
                <label>
                    개발 도구
                    <input></input>
                </label>
                <label>
                    개발 기술
                    <input></input>
                </label>
                <label>
                    개발 언어
                    <input></input>
                </label>
                <label>
                    발주처
                    <input></input>
                </label>
                <label>
                    발주처 담당자
                    <input></input>
                </label>
                <label>
                    발주처 담당자 전화번호
                    <input></input>
                </label>
                <label>
                    발주처 담당자 이메일
                    <input></input>
                </label>
                <label>
                    프로젝트 설명
                    <input></input>
                </label>
                <button>프로젝트 등록</button>
            </form>
        </div>
    )
}

export default CreateProj