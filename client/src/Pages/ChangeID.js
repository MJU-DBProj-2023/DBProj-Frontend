import React ,{useState} from "react";
import '../styles/style.css'

const ChangeID = () => { 
    const [ni, setNi] = useState("")

    const LoginFunc = (e) => {
        e.preventDefault();
    }
    
    const myArray = ['1', '2', '3', '4', '5'];
    function checkDuplicates(array, value) {
        return array.includes(value);
      }


    // const realID = "hana"
    // const realPW = "1111"
    return(
        <div>
           <form className="login_wrap" onSubmit={LoginFunc}>
                <button>현재 아이디: xxx</button>
                <input type="text" 
                placeholder="새로운 아이디"
                value={ni}
                onChange={(e) => setNi(e.target.value)} />
                <button type="submit" onClick={e => {
                    if(checkDuplicates(myArray,ni)) {
                        alert("이미 사용 중인 아이디입니다.")
                    }else if (ni === "") {
                        alert("새로운 아이디를 입력해 주세요")
                    }else {

                        alert("아이디가 변경되었습니다.")
                    }       
                }}>아이디 변경 </button>
            </form>
        </div>
    )
}
export default ChangeID