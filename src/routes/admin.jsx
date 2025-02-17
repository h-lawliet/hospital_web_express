import { useState, useEffect } from "react"
import { Link, Router, Route, Routes, BrowserRouter, useLocation } from "react-router-dom"
import Login from "../admin/login.jsx"
import AdminNotice from "../admin/AdminNotice.jsx"
import AdminExamination from "../admin/AdminExamination.jsx"
import CreateExamination from "../admin/CreateExamination.jsx"
import api from "../api.js"

function Admin() {

  const location = useLocation()

  let [examinationList, setExaminationList] = useState([])
  let [user, setUser] = useState(null)

  useEffect(()=>{
    api.get("/check", {withCredentials: true}).then((res)=>{
      if (res.data.loggedIn) setUser(res.data.user)
    }).catch((err)=>{
      console.log(err)
    })
  }, [])

  const handleLogout = async () => {
    await api.post("/logout", {}, { withCredentials: true });
    setUser(null);
    navigate("/api/admin")
  };


  return(
    <div style={{
      margin: "30px 50px"
    }}>
      <strong>홍지만신경과 관리자 페이지</strong><br/>
      기타 문의사항이 있으시면 010-8681-0930 또는 카카오톡아이디 h_lawliet로 언제든 편하게 문의주세요!<br/><br/><br/>
      <Link to="/api/admin">관리자 홈</Link><br/>
      <Link to="/api/admin/notice">공지사항 항목 편집</Link><br/>
      <Link to="/api/admin/examination">검사안내 항목 편집</Link><br/>
      {!user && <Link to="/api/admin/login">로그인</Link>}
      {user && <button onClick={handleLogout}>로그아웃</button>}
      

      <Routes>
        <Route path="" element={
          <><br/><br/><p>관리자 홈화면 ദ്ദി^ᴗ ̫ ᴗ^₎</p></>
        }/>
        <Route path="notice/*" element={<AdminNotice user={user} setUser={setUser}/>}/>
        <Route path="examination" element={<AdminExamination user={user} setUser={setUser} examinationList={examinationList}/>}/>
        <Route path="login" element={<Login setUser={setUser}/>}/>
        <Route path="examination/write" element={<CreateExamination user={user}/>}/>
      </Routes>
    </div>
  )
}

export default Admin