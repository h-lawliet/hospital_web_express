import { useEffect, useState } from "react";
import { useNavigate, Link, Route, Routes } from "react-router-dom";

const AdminExamination = ({ user, setUser, examinationList }) => {

  return (
    <div>
      <h2></h2>
      {user ? (
        <>
          <p>{user}님, 환영합니다!</p>
          <br/><br/><hr/><br/>
          <button><Link style={{
            textDecoration: "none",
            color: "inherit"
          }} to="/api/admin/examination/write">검사안내 추가</Link></button><br/><br/><hr/>
          <div>아래의 리스트는 검사안내 글 목록 입니다. 
            글 제목 옆의 버튼을 눌러서 삭제 또는 수정하실 수 있습니다.</div>
          {
            examinationList.map((e, i)=>{
              return(
              <div key={i}>
                <br/><span>{e.title}</span>&nbsp;
                <button><Link style={{
                  textDecoration: "none",
                  color: "inherit"
                }} to={`/api/admin/examination/edit/${e._id}`}>편집하기</Link></button><br/>
              </div>
              )
            })
          }
          
        </>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
};

export default AdminExamination