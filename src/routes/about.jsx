import { useParams } from "react-router-dom"
import styled from "styled-components"
import PageContainer from "../components/pageContainer.jsx"
import Members from "./about/members.jsx"
import Greeting from "./about/greeting.jsx"
import Research from "./about/research.jsx"
import NaverMap from "../components/NaverMap.jsx"
import Facility from "./about/facility.jsx"

function Worktime() {
  return(
    <img src="/images/worktime.png" style={{
      width: "100%",
      height: "auto",
      paddingTop: "15vh"
    }}/>
  )
  // 임시로 넣어둠
}

function Destination() {

  const StyledDestination = styled.div`

    padding-top: 40px;
    & > h3 {
      color: rgb(0, 51, 161);
      padding-top: 30px;
      margin: 0;
      font-size: calc(19px + 0.05vw);
    }
    & > p {
      font-size: calc(16px + 0.03vw);
      margin: 0;
      padding-top: 8px;
    }

    @media (max-width: 600px) {

      padding-top: 45px;
      & > h3 {
        color: rgb(0, 51, 161);
        padding-top: 25px;
        margin: 0;
        font-size: 16px;
      }
      & > p {
        font-size: 14px;
        margin: 0;
        padding-top: 7px;
      }
    }
  `

  return(
    <>
    <StyledDestination>
      <h3>주소</h3>
      <p>도로명 주소: 경기도 수원시 팔달구 경수대로546 (인계동)</p>
      <p>지번 주소: 경기도 수원시 팔달구 인계동 944-5</p>
      <h3>버스 이용시</h3>
      <p><span>KBS 수원센터 / 수원고용복지플러스센터, 동수원사거리</span>정거장 하차</p>
      
    </StyledDestination>
    <NaverMap/>
    </>
  )
  // 배포 후 url 등록해야됨
}


// if문 처리 역할
function AboutContent() {
  let {id} = useParams()

  if (id == 0) {
    return <Greeting/>
  } else if (id == 1) {
    return <Members/>
  } else if (id == 2) {
    return <Research/>
  } else if (id == 3) {
    return <Worktime/>
  } else if (id == 4) {
    return <Destination/>
  } else {
    return <Facility/>
  }
}

function About(props) {
  return(
    <PageContainer item={props.item} content={<AboutContent/>}/>
  )
}

export default About