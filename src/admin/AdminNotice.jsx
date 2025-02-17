import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import CreateNotice from "./CreateNotice";
import NoticeDetail from "./noticeDetail";
import api from "../api";

const AdminNotice = ({ user }) => {

  const location = useLocation()

  let [noticeList, setNoticeList] = useState([])

  useEffect(()=>{
    if (user) {
      api.get("/notice", {withCredentials: true}).then((res)=>{
        setNoticeList(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }, [user, location])

  return (
    <Routes>
      <Route path="" element={
        <div>
          <h2></h2>
          {user ? (
            <>
              <p>{user}님, 환영합니다!</p>
              <br/><br/><hr/><br/>
              <button><Link style={{
                textDecoration: "none",
                color: "inherit"
              }} to="/api/admin/notice/create">공지사항 추가</Link></button><br/><br/><hr/>
              <div>아래의 리스트는 공지사항 글 목록 입니다. 
                글 제목 옆의 버튼을 눌러서 삭제 또는 수정하실 수 있습니다.</div>
              {
                noticeList.map((e, i)=>{
                  return(
                  <div key={i}>
                    <br/><span>{e.title}</span>&nbsp;
                    <button><Link style={{
                      textDecoration: "none",
                      color: "inherit"
                    }} to={`/api/admin/notice/${e._id}`}>편집하기</Link></button><br/>
                  </div>
                  )
                })
              }
              
            </>
          ) : (
            <p>로그인이 필요합니다.</p>
          )}
        </div>
      }/>
      <Route path="create" element={<CreateNotice user={user}/>}/>
      <Route path="/:id" element={<NoticeDetail user={user}/>}/>
    </Routes>
  );
};

export default AdminNotice