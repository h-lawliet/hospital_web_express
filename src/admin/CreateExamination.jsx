import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import api from "../api";


const StyledDiv = styled.div`
  textarea {
    width: 100%;
    height: 100px;
  }
`

const CreateExamination = (props) => {
  const navigate = useNavigate();
  let [title, setTitle] = useState("")
  let [room, setRoom] = useState("")
  let [purpose, setPurpose] = useState("")
  let [method, setMethod] = useState("")
  let [time, setTime] = useState("")
  let [caution, setCaution] = useState("")
  let [result, setResult] = useState("")
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    
    const formData = new FormData()
    formData.append("title", title)
    formData.append("room", room)
    formData.append("purpose", purpose)
    formData.append("method", method)
    formData.append("time", time)
    formData.append("caution", caution)
    formData.append("result", result)
    formData.append("image", imageFile)
    try {
      const response = await api.post("/examination/create", formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      );
      if(response.data.state === 0) {
        console.log(response)
        alert(response.data.message)
        navigate("/api/admin/examination")
      } else if(response.data.state === 1) {
        console.log(response)
        alert(response.data.message)
      } else if(response.data.state === 2) {
        console.log(response)
        alert(response.data.message + ": 관리자에게 문의하세요")
      } else {
        console.log(response)
        alert(response.data.message)
      }
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("서버 에러. 관리자에게 문의하세요: "+error)
    }
    console.log(formData)
  };

  return (
    <>
    {
      props.user ? <>
      <StyledDiv>
        <br/>
        <br/>
        <br/>
        <hr/>
        사진(1장) : <input type="file" accept="image/*" onChange={handleImageChange}/>
        {imageFile && <p>{imageFile.name}</p>}<br/>
        검사 제목 : <textarea type="text" name="title" value={title} onChange={(e)=>{
          setTitle(e.target.value)
        }}/><br/>
        검사실 : <textarea type="text" name="room" value={room} onChange={(e)=>{
          setRoom(e.target.value)
        }}/><br/>
        검사 목적 : <textarea type="text" name="purpose" value={purpose} onChange={(e)=>{
          setPurpose(e.target.value)
        }}/><br/>
        검사 방법 : <textarea type="text" name="method" value={method} onChange={(e)=>{
          setMethod(e.target.value)
        }}/><br/>
        소요 시간 : <textarea type="text" name="time" value={time} onChange={(e)=>{
          setTime(e.target.value)
        }}/><br/>
        주의사항 : <textarea type="text" name="caution" value={caution} onChange={(e)=>{
          setCaution(e.target.value)
        }}/><br/>
        결과 해석 : <textarea type="text" name="result" value={result} onChange={(e)=>{
          setResult(e.target.value)
        }}/><br/>

        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>글쓰기</button>
      </StyledDiv>
      </> : <><br/><br/><div>로그인이 필요합니다.</div></>
    }
    </>
    
  );
};

export default CreateExamination