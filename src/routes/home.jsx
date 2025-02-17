import styled from "styled-components"
import ImageSlider from "../components/imageSlide"
import { useState, useEffect } from "react"
import ResponsiveSlider from "../components/homeNoticeSlide"
import ResearchSlider from "../components/researchSlide"

function Home() {

  let [clinicList] = useState(
    [
      {
        title: "모야모야 특화센터",
        content: "최고 전문의의 효과적인 예방법과 차별화된 비수술·최소침습시술로 모야모야 병기에 따른 최적 맞춤치료!",
        image: "/images/image1.jpg",
        path: "/center/0"
      },
      {
        title: "뇌졸중 특화센터",
        content: "전문적팀으로 정확한 진단과 차별화된 집중치료 모니터링으로 고위험 환자에서도 최적 맞춤치료!",
        image: "/images/image1.jpg",
        path: "/center/1"
      },
      {
        title: "두통·어지럼증센터",
        content: "최고 전문의의 효과적인 진단과 차별화된 치료시스템으로 개인화된 최적의 맞춤치료!",
        image: "/images/image1.jpg",
        path: "/center/2"
      },
      {
        title: "뇌졸중·치매 통합 예방센터",
        content: "최고 전문의의 친절한 설명과 함께 차별화된 뇌졸중·치매를 통합하는 개인위험도에 따른 최적의 예방치료!",
        image: "/images/image1.jpg",
        path: "/center/3"
      },
      {
        title: "운동 · 이완센터",
        content: "자세, 체성분, 운동능력 분석으로 차별화된 운동치료로 최적의 맞춤치료!",
        image: "/images/image1.jpg",
        path: "/center/4"
      }
    ]
  )

  const HomePictureFrame = styled.div`

    @media (max-width: 600px) {
      width: 100%;
      aspect-ratio: 1.2;
    }

    @media (min-width: 600px) {
      width: 100%;
      height: 88vh;
    }
  `
  
  const HomeContentFrame = styled.div`

    margin-bottom: 10vh;

    .home-slider-container {
      display: flex;
      justify-content: center;
    }
    
    .line-deco {
      margin-top: 70px;
      height: 3.5px;
      width: 60px;
      background: linear-gradient(to right, rgb(0, 51, 161), rgb(67, 110, 203));
    }
    .special-clinic-container {
      padding-top: 5vh;
      display: grid;
    }
    .special-clinic-content {
      display: flex;
      flex-direction: row;
      // height: 32vh;
    }
    .special-clinic-img {
      height: 32vh;
      width: 32vh;
      flex-shrink: 0;
      background-position: center;
      transition: background-size 0.7s ease-in-out;
      background-size: auto 100%;
      background-repeat: no-repeat;
    }
    .special-clinic-text {
      padding: 1vh 2vh;
      flex-grow: 1;
      background-color: rgb(247, 247, 247);
    }
    .special-clinic-text > h3 {
      margin: 0.5em 0;
      font-weight: 500;
      font-size: clamp(15px, 2.4vh, 48px);
      color: rgb(0, 51, 161);
    }
    .special-clinic-text > p {
      font-size: clamp(10px, 2.15vh, 25px);
      font-weight: 300;
    }
    .special-clinic-btn {
      display: inline-block;
      cursor: pointer;
      font-size: clamp(10px, 2.2vh, 25px);
      border-radius: 3.3vh;
      border: 1px solid rgb(35, 82, 184);
      color: rgb(35, 82, 184);
      padding: 0.7vh 1.3vh;
    }
    .special-clinic-btn:hover {
      background: linear-gradient(to right, rgb(0, 51, 161), rgb(67, 110, 203));
      // background-color: rgb(0, 51, 161);
      border: none;
      color: rgb(244, 240, 240);
    }
    .special-clinic-btn > a {
      color: inherit;
      text-decoration: none;
    }


    .special-clinic-content:hover .special-clinic-img {
      background-size: auto 130%;
    }
    
    @media (min-width: 1200px) {
      padding: 0 10vw;

      .special-clinic-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 2vw 2vw;
      }
    }

    @media (max-width: 1200px) and (min-width: 600px) {
      padding: 0 4vw;

      .special-clinic-container {
        grid-template-columns: repeat(1, 1fr);
        gap: 15px;
      }

    }
    @media (max-width: 600px) {

      & > h2 {
        font-size: calc(16px + 0.05vw);
      }
      & > p {
        font-size: calc(13px + 0.05vw);
      }

      padding: 0 4vw;

      .special-clinic-container {
        grid-template-columns: repeat(1, 1fr);
        gap: 15px;
        padding-top: 10px;
      }

      .special-clinic-img {
        display: none;
      }
      .special-clinic-text {
        padding: 5px 10px;
        flex-grow: 1;
        background-color: rgb(247, 247, 247);
      }
      .special-clinic-text > h3 {
        margin: 5px 0;
        font-weight: 500;
        font-size: 14px;
        color: rgb(0, 51, 161);
      }
      .special-clinic-text > p {
        font-size: calc(11px + 0.1vw);
        line-height: calc(18px + 0.1vw);
        font-weight: 300;
        padding-bottom: 5px;
        margin: 0;
      }
      .special-clinic-btn {
        display: inline-block;
        cursor: pointer;
        font-size: 11px;
        border-radius: 12px;
        border: 1px solid rgb(35, 82, 184);
        color: rgb(35, 82, 184);
        padding: 4px 6px;
        background-color: white;
        margin-bottom: 5px;
      }
      .special-clinic-btn:hover {
        background: linear-gradient(to right, rgb(0, 51, 161), rgb(67, 110, 203));
        // background-color: rgb(0, 51, 161);
        border: 1px solid rgb(247, 247, 247);
        color: rgb(244, 240, 240);
      }
      .special-clinic-btn > a {
        color: inherit;
        text-decoration: none;
      }
    }
  `


  return (
    <>
      <HomePictureFrame>
        <ImageSlider/>
      </HomePictureFrame>
      <HomeContentFrame>
        <div className="line-deco"/>
        <h2>연구활동</h2>
        <p>논문 많이 씀. 연구 많이함.</p>
        <div className="home-slider-container">
          <ResearchSlider/>
        </div>

        <div className="line-deco"/>
        <h2>특화센터 소개</h2>
        <p>홍지만신경과에는 개쩌는 특수센터가 있으니까 많이많이 오십셔</p>
        <div className="special-clinic-container">
          {
            clinicList.map((e, i)=>{
              return (
                <div key={i} className="special-clinic-content">
                  {/* 무조건 가로가 더 긴 사진이여야됨. */}
                  <div className="special-clinic-img" style={{backgroundImage: `url(${e.image})`}}/>
                  <div className="special-clinic-text">
                    <h3>{e.title}</h3>
                    <p>{e.content}</p>
                    <div className="special-clinic-btn">
                      <a href={e.path}>
                        {e.title.length > 13 ? <>뇌졸중 · 치매 통합센터</> : e.title}
                        &nbsp;➜
                      </a>
                      </div>
                  </div>
                </div>
              )
            })
          }
          
        </div>

        <div className="line-deco"/>
        <h2>병원 공지사항</h2>
        <ResponsiveSlider/>
        
      </HomeContentFrame>
    </>
  )
}

export default Home