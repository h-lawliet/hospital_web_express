import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import api from "../api"

const Noticedetail = styled.div`

`


export function NoticeDetail() {

  let [noticeData, setNoticeData] = useState({})
  let {id} = useParams()

  useEffect(()=>{
    api.get(`http://localhost:3000/notice/${id}`)
    .then(async (res)=>{
      await setNoticeData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }, [id])

  return (
    <Noticedetail>
      <div className="noticeDetail-heading">
        <div id="title">
          {noticeData.title}
        </div>
        <div id="time">
          {noticeData.time}
        </div>
        <div id="views">
          {noticeData.views}
        </div>
      </div>
    </Noticedetail>
  )
}