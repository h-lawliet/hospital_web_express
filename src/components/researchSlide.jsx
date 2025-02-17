import Slider from "react-slick";
import styled from "styled-components";
import { homeResearch } from "../data/homeResearch";

const SliderContainer = styled.div`
  @media (max-width: 1200px) {
    width: 100%;
  }
  @media (min-width: 1200px) {
    width: 90%;
  }
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;

  .research-slider {
    width: 100%;
    padding: 0 
  }
  
  .slick-prev:before, .slick-next:before {
    color: black;
  }
`
const SlideItem = styled.div`
  width: 100%;
  aspect-ratio: 2.8;
  display: flex !important;
  flex-direction: row;
  border-top: 1px solid rgb(220, 217, 217);
  border-bottom: 1px solid rgb(220, 217, 217);
  padding: 1em 0;
  margin-bottom: 1em;

  .slide-item-img {
    width: 25%;
    display: flex;
    margin: 10px;
    margin-left: 1em;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    overflow: hidden;
  }
  .slide-item-img img {
    width: 100%;
  }

  .slide-item-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 2vw;
  }
  .research-heading {
    color: #7f99cf;
    padding-top: 0.5em;
    padding-bottom: 1em;
    margin: 0;
  }
  #color-bold {
    color: rgb(0, 51, 161);
  }
  .slide-item-content > p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    font-weight: 300;
  }
`

function ResearchHeading(props) {
  if (props.index == 0) {
    return(
      <h3 className="research-heading">
        지역사회를 위한 국내 최초 한국형 뇌졸중 프로그램, <span id="color-bold">"아주 뇌졸중 프로그램" 개발</span>
      </h3>
    )
  } else if (props.index == 1) {
    return (
      <h3 className="research-heading">
        모야모야병 및 뇌혈관재생 분야
      </h3>
    )
  } else {
    return (
      <h3 className="research-heading">
        신경집중치료(저체온 냉동치료) 및 뇌세포 보호 분야
      </h3>
    )
  }
}


function ResearchSlider() {


  return (
    <SliderContainer>
      <Slider 
        className="research-slider"
        autoplay={true}
        autoplaySpeed={7000}
        infinite={true}
        arrows={false}
        dots={true}
        slidesToScroll={1}
        slidesToShow={1}
      >
      {
        homeResearch.map((e)=>{
          return(
            <SlideItem>
              <div className="slide-item-img">
                <img src={e.image}/>
              </div>
              <div className="slide-item-content">
                <ResearchHeading index={e.index}/>
                {
                  e.contents.map((element)=>{
                    return(
                      <p>{element}</p>
                    )
                  })
                }
              </div>
            </SlideItem>
          )
        })
      }
      </Slider>
    </SliderContainer>
  );
}

export default ResearchSlider