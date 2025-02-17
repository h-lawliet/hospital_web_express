import { useParams, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import api from "../api";


// 이미지 리스트 받아오기
// post 요청 수정

const NoticeDetail = ({user}) => {
  let { id } = useParams(); // URL에서 ID 가져오기
  let navigate = useNavigate();
  const location = useLocation()
  let [notice, setNotice] = useState({})

  // 해당 ID의 공지사항 찾기
  useEffect(()=>{
    if (user) {
      api.get(`/notice/${id}`, {withCredentials: true}).then((res)=>{
        setNotice(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }, [user, location])

  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [title, setTitle] = useState(""); // 제목 상태 추가
  const [images, setImages] = useState([]); // 업로드할 이미지 상태
  const [imagePreviews, setImagePreviews] = useState([]); // 이미지 파일 이름 미리보기 상태

  // 텍스트 포맷 적용
  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  // 파일 선택 핸들러 (여러 개의 이미지 추가 가능)
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          
          setImagePreviews(prev => [...prev, file.name]);
          setImages(prev => [...prev, file]); // 이미지 파일 저장
        };
        reader.readAsDataURL(file);
      }
    });

    e.target.value = ""; // 같은 파일 재선택 가능하도록 초기화
  };

  // 서버로 데이터 전송
  const handleModify = async () => {
 
    const formData = new FormData();
    formData.append("title", title); // 제목 추가
    formData.append("content", editorRef.current.innerHTML); // 내용 추가
    images.forEach((image) => formData.append("images", image)); // 이미지 추가
    try {
      const response = await api.post("/notice/modify", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      if(response.data.state === 2) {
        console.log(response)
        alert(response.data.message)
        navigate("/api/admin/login")
      } else if(response.data.state === 0) {
        console.log(response)
        alert("관리자에게 문의하세요: "+response.data.message)
        navigate("/api/admin")
      } else if(response.data.state === 1) {
        alert(response.data.message)
      } else {
        alert(response.data.message)
        navigate("/api/admin")
      }
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("서버 에러. 관리자에게 문의하세요: "+error)
    }
  };

  return (
    <>
    {
      user ? <>
      <div>
        {/* 도구 모음 */}
        <div style={{ marginBottom: "10px" }}>
          <br/><br/><hr/>
          <button onClick={() => handleFormat("bold")}>볼드체</button>&nbsp;
          <button onClick={() => handleFormat("italic")}>이탤릭</button>&nbsp;
          <button onClick={() => handleFormat("underline")}>밑줄</button>&nbsp;
          <button onClick={() => handleFormat("insertUnorderedList")}>불렛 리스트</button>&nbsp;
          <button onClick={() => handleFormat("insertOrderedList")}>숫자 리스트</button>&nbsp;&nbsp;
          <button onClick={() => fileInputRef.current.click()}>이미지 추가</button>
        </div>

        {/* 이미지 미리보기 */}
        {imagePreviews.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <strong>추가된 이미지:</strong>
            <ul>
              {imagePreviews.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 파일 입력 */}
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />

        {/* 제목 입력 */}
        제목 : <input type="text" value={notice.title} onChange={(e) => setTitle(e.target.value)} />

        {/* 에디터 */}
        <div
          ref={editorRef}
          contentEditable
          style={{
            fontSize: "15px",
            border: "1px solid #ccc",
            minHeight: "500px",
            padding: "10px"
          }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(notice.content) }}
        ></div>

        {/* 저장 버튼 */}
        <button onClick={handleModify} style={{ marginTop: "10px" }}>글쓰기</button>
      </div>
      </> : <><br/><br/><div>로그인이 필요합니다.</div></>
    }
    </>
    
  );
};

export default NoticeDetail