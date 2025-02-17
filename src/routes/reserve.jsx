import styled from "styled-components"
import PageContainer from "../components/pageContainer"
import { useState } from "react"
import axios from "axios"
import api from "../api.js"

const Reservecontent = styled.div`
  display: flex;
  flex-direction: column;

  .reserve-title > p {
    font-weight: 500;
    font-size: 17px;
    line-height: 30px;
    padding-bottom: 5vh;
  }

  .line-deco {
    margin-top: 70px;
    height: 3.5px;
    width: 60px;
    background: linear-gradient(to right, rgb(0, 51, 161), rgb(67, 110, 203));
  }

  .reserve-input > input {
    margin: 2vh 5px 2vh 2px;
    padding: 0;
    line-height: 30px;
    outline: none;
    border: 1px solid rgb(180, 176, 176);
    border-radius: 5px;
  }
  .input-alert { 
    color: red;
    font-size: 11px;
  }

  .reserve-content {
    resize: none;
    font-family: "Noto Sans KR", serif;
    padding: 0;
    margin: 2vh 2px;
    width: calc(100% - 44px);
    font-size: 16px;
    outline: none;
    border: 1px solid rgb(180, 176, 176);
    line-height: 30px;
    padding: 12px 20px;
    border-radius: 5px;
  }

  @keyframes fillBackground {
    0% { background-position: 0% 0; }
    100% { background-position: 90% 0; }
  }
  .submit-btn {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 6px;
    color: rgb(0, 51, 161);
    margin-top: 2vh;
    border: 1px solid rgb(0, 51, 161);
    cursor: pointer;
    background: linear-gradient(to left, rgb(0, 51, 161) 50%, white 50%);
    background-size: 250% 100%;
    transition: background-position 0.5s ease-in-out;
  }

  .submit-btn:hover {
    color: white;
    animation: fillBackground 0.5s forwards;
  }



  @media (max-width: 600px) {
    .reserve-title > p {
      font-weight: 600;
      font-size: 15px;
      padding-bottom: 5vh;
      line-height: 25px;
    }
    .reserve-input {
      font-size: 14px;
    }
    .reserve-input > input {
      margin: 1vh 5px 2vh 2px;
      padding: 0;
      line-height: 25px;
      outline: none;
      border: 1px solid rgb(180, 176, 176);
      border-radius: 5px;
    }
    .input-alert { 
      color: red;
      font-size: 10px;
    }

    .reserve-content {
      resize: none;
      font-family: "Noto Sans KR", serif;
      padding: 0;
      margin: 1vh 2px;
      margin-top: 2vh;
      width: calc(100% - 24px);
      font-size: 14px;
      outline: none;
      border: 1px solid rgb(180, 176, 176);
      line-height: 30px;
      padding: 6px 10px;
      border-radius: 5px;
    }

    @keyframes fillBackground {
      0% { background-position: 0% 0; }
      100% { background-position: 90% 0; }
    }
    .submit-btn {
      display: inline-block;
      padding: 10px 20px;
      border-radius: 6px;
      color: rgb(0, 51, 161);
      margin-top: 2vh;
      margin-left: 2px;
      border: 1px solid rgb(0, 51, 161);
      cursor: pointer;
      background: linear-gradient(to left, rgb(0, 51, 161) 50%, white 50%);
      background-size: 250% 100%;
      transition: background-position 0.5s ease-in-out;
    }

    .submit-btn:hover {
      color: white;
      animation: fillBackground 0.5s forwards;
    }
  }
`

function ReserveContent() {

  let [name, setName] = useState("")
  let [phone, setPhone] = useState("")
  let [content, setContent] = useState("")
  let [isAlert, setIsAlert] = useState(false)


  const handleSubmit = async () => {
 
    try {
      const response = await api.post("http://localhost:3000/reserve/create", 
        {
          name, phone, content
        },
        {
          headers: { "Content-Type": "application/json" }, // JSON 방식으로 전송
          withCredentials: true,
        }
      );
      if(response.data.state === 0) {
        console.log(response)
        alert(response.data.message)
        setContent("")
        setPhone("")
        setName("")
        setIsAlert(false)
      } else if(response.data.state === 1) {
        console.log(response)
        alert(response.data.message)
      } else {
        console.log(response)
        alert(response.data.message + ": 관리자에게 문의하세요")
      }
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("서버 에러. 관리자에게 문의하세요: "+error)
    }
  };




  return (
    <Reservecontent>
      <div className="reserve-title">
        <div className="line-deco"/>
        <p>성함, 연락처와 증상을 기술해주시면 예약확정을 위해 입력하신 연락처로 연락드리겠습니다</p>
      </div>
      <div className="reserve-input">
        성함 : <input type="text" name="name" value={name} onChange={(e)=>{
          setName(e.target.value)
        }}/><br/>
        연락처(휴대폰 번호) : <input type="text" name="phone" value={phone} onChange={(e)=>{
          if (/^\d*$/.test(e.target.value)) {
            setPhone(e.target.value)
          } else {
            setIsAlert(true)
          }
        }}/>{isAlert && <span className="input-alert">*숫자만 입력 가능합니다.</span>}
        <textarea
          className="reserve-content"
          placeholder="이곳에 증상을 간략히 기입해주세요"
          rows="10"
          name="content"
          value={content}
          onChange={(e)=>{setContent(e.target.value)}}
        />
        <div className="submit-btn" onClick={handleSubmit}>예약하기</div>
      </div>
    </Reservecontent>
  )
}

export default function Reserve(props) {
  return(
    <PageContainer item={props.item} content={<ReserveContent/>}/>
  )
}