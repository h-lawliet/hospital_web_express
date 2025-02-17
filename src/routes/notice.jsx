import styled from "styled-components"
import PageContainer from "../components/pageContainer.jsx"
import { useEffect, useState } from "react"
import axios from "axios"
import { Route, Routes, useNavigate, useLocation } from "react-router-dom"
import { NoticeDetail } from "./noticeDetail.jsx"
import api from "../api.js"

// 나중에 페이지네이션 작업 필요할지도 모름. (공지사항 많아지면)
function NoticeContent() {
  
  let [noticeList, setNoticeList] = useState([])
  let [isSmall, setIsSmall] = useState(false)
  const location = useLocation()

  const handleResize = () => {
    setIsSmall(window.innerWidth <= 600)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [noticeList])


  useEffect(()=>{
    api.get("/notice", {withCredentials: true}).then((res)=>{
      setNoticeList(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }, [location])

  const navigate = useNavigate()
  
  const StyledNotice = styled.div`

    .line-deco {
      margin-top: 70px;
      margin-bottom: 1em;
      height: 3.5px;
      width: 60px;
      background: linear-gradient(to right, rgb(0, 51, 161), rgb(67, 110, 203));
    }

    .notice-number {
      color: rgb(69, 67, 67);
      font-weight: 300;
      font-size: 1.2em;
      padding-bottom: 6vh;
    }
    .notice-number > span {
      color: rgb(0, 51, 161);
    }

    .notice-list {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .notice-list-heading {
      display: flex;
      background-color: rgb(247, 243, 242);
      line-height: 50px;
      border-bottom: 1px solid rgb(220, 215, 215);
      border-top: 1px solid rgb(220, 215, 215);
      font-weight: 500;
      color: rgb(62, 61, 61);
    }
    #notice-title-heading {
      flex-grow: 1;
      text-align: center;
    }
    #notice-time-heading {
      width: 150px;
      text-align: center;
    }
    #notice-views-heading {
      width: 70px;
      text-align: center;
    }
    .notice-list-item {
      display: flex;
      width: 100%;
      line-height: calc(50px + 0.2vw);
      border-bottom: 0.5px solid rgb(239, 236, 236);
      cursor: pointer;
    }
    .notice-list-item:hover {
      padding-left: 5px;
      font-weight: 700;
    }
    
    #notice-title {
      padding: 0 10px;
      flex-grow: 1;
      font-size: calc(15px + 0.1vw);
      color: rgb(0, 51, 161);
    }
    #notice-time {
      width: 150px;
      flex-shrink: 0;
      color: rgb(143, 140, 140);
      font-size: calc(15px + 0.1vw);
      text-align: center;
    }
    #notice-views {
      width: 70px;
      flex-shrink: 0;
      font-size: calc(15px + 0.1vw);
      color: rgb(143, 140, 140);
      text-align: center;
    }

    @media (max-width: 600px) {

      .notice-number {
        color: rgb(69, 67, 67);
        font-weight: 400;
        font-size: 16px;
        padding-bottom: 6vh;
      }
      .notice-number > span {
        color: rgb(0, 51, 161);
      }

      .notice-list {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .notice-list-heading {
        display: flex;
        background-color: rgb(247, 243, 242);
        line-height: 50px;
        border-bottom: 1px solid rgb(220, 215, 215);
        border-top: 1px solid rgb(220, 215, 215);
        font-weight: 500;
        color: rgb(62, 61, 61);
        font-size: 14px;
      }
      #notice-title-heading {
        flex-grow: 1;
        text-align: center;
      }
      #notice-time-heading {
        display: none;
      }
      #notice-views-heading {
        display: none;
      }
      .notice-list-item {
        display: flex;
        flex-direction: column;
        width: 100%;
        border-bottom: 0.5px solid rgb(239, 236, 236);
        cursor: pointer;
        padding: 10px 0;
      }
      .notice-list-item:hover {
        padding-left: 5px;
        font-weight: 700;
      }
      
      #notice-title {
        padding: 0 5px;
        flex-grow: 1;
        font-size: 14px;
        color: rgb(0, 51, 161);
        line-height: 27px;
      }
      #time-and-views {
        font-size: 11px;
        color: rgb(118, 116, 116);
        line-height: 23px;
      }
      #notice-time {
        color: rgb(143, 140, 140);
        font-size: 11px;
        padding-left: 5px;
        padding-right: 8px;
      }
      #notice-views {
        font-size: 11px;
        color: rgb(143, 140, 140);
        padding-left: 8px;
        padding-right: 5px;
      }
      #notice-views-bold {
        padding-right: 4px;
      }
    }

  `
  let temp = noticeList
  temp.sort((a, b) => b._id.localeCompare(a._id))

  return (
    <Routes>
      <Route path="" element={
        <StyledNotice>
          <div className="line-deco"/>
          <div className="notice-number">
            Total <span>{noticeList.length}</span>건
          </div>
          <div className="notice-list">
            <div className="notice-list-heading">
              <span id="notice-title-heading">제목</span>
              <span id="notice-time-heading">작성 일시</span>
              <span id="notice-views-heading">조회수</span>
            </div>
          {
            temp.map((element, i)=>{
              return(
                <div className="notice-list-item" onClick={()=>{
                  navigate(`/notice/${element._id}`)
                }}>
                  <span id="notice-title">{element.title}</span>
                  {
                    isSmall ? <div id="time-and-views">
                      <span id="notice-time">{element.time}</span>/
                      <span id="notice-views"><span id="notice-views-bold">조회수</span>{element.views}</span>
                    </div> : 
                    <>
                      <span id="notice-time">{element.time}</span>
                      <span id="notice-views">{element.views}</span>
                    </>
                  }
                </div>
              )
            })
          }
          </div>
          
        </StyledNotice>
      }/>
      <Route path=":id" element={
        <NoticeDetail/>
      }/>
    </Routes>
  )
}

function Notice(props) {
  return (
    <PageContainer item={props.item} content={<NoticeContent/>}/>
  )
}

export default Notice 