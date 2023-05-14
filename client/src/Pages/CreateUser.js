import React from "react";

const CreateUser = () => {
    return(
        <div className="Form_wrap">
            <form  className="Form">
                <label>
                    사번
                    <input></input>
                </label>
                <label>
                    사원 이름
                    <input></input>
                </label>
                <label>
                    주민등록번호
                    <input></input>
                </label>
                <label>
                    최종 학력
                    <input></input>
                </label>
                <label>
                    입사일
                    <input></input>
                </label>
                <label>
                    주소
                    <input></input>
                </label>
                <label>
                    연봉
                    <input></input>
                </label>
                <label>
                    직위
                    <input></input>
                </label>
                <label>
                    부서 ID
                    <input></input>
                </label>
                <label>
                    매니저 (사번)
                    <input></input>
                </label>
                <label>
                    권한 코드
                    <input></input>
                </label>
                <label>
                    스킬셋
                    <input></input>
                </label>
                <label>
                    개발 레벨
                    <input></input>
                </label>
                <label>
                    연차
                    <input></input>
                </label>
                <button>직원 등록</button>
            </form>
        </div>
    )
}

export default CreateUser