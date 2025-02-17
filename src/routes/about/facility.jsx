import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";

const FacilityImage = [
  {
    url: "/images/image1.jpg",
    floor: 1
  },
  {
    url: "/images/image2.jpg",
    floor: 1
  },
  {
    url: "/images/image5.jpg",
    floor: 1
  },
  {
    url: "/images/image1.jpg",
    floor: 1
  },
  {
    url: "/images/image1.jpg",
    floor: 1
  },
  {
    url: "/images/image1.jpg",
    floor: 1
  },
  {
    url: "/images/image1.jpg",
    floor: 1
  },
  {
    url: "/images/image2.jpg",
    floor: 2
  },
  {
    url: "/images/image2.jpg",
    floor: 2
  },
  {
    url: "/images/image2.jpg",
    floor: 2
  },
]

const SliderContainer = styled.div`
  @media (max-width: 1200px) {
    width: 100%;
  }
  @media (min-width: 1200px) {
    width: 80%;
  }
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;

  .facility-slider {
    width: 100%;
    padding: 0 
  }

  .facility-slider-second {
    width: calc(100% - 6vw - 40px);
    padding: 0;
    margin-top: 20px;
  }
  .slick-prev:before, .slick-next:before {
    color: black;
    opacity: 0.4;
  }
`
const SlideItem = styled.div`
  background-image: url(${(props) => props.img});
  width: 100%;
  aspect-ratio: 1.6;
  background-size: 100% auto;
  background-position: center center;
  background-repeat: no-repeat;
`
const SlideItemPadding = styled.div`
  width: calc(100% - 2vw);
  box-sizing: border-box;
  aspect-ratio: 1.6;
  background-image: url(${(props) => props.img});
  background-size: 90% auto;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
`

function AsNavFor({images}) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  return (
    <SliderContainer>
      <Slider 
        className="facility-slider"
        asNavFor={nav2}
        autoplay={true}
        autoplaySpeed={7000}
        infinite={true}
        arrows={false}
        ref={slider => (sliderRef1 = slider)}>
      {
        images.map((e)=>{
          return(
            <SlideItem img={e.url}/>
          )
        })
      }
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={slider => (sliderRef2 = slider)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
        infinite={true}
        centerMode={true}
        className="facility-slider-second"
        arrows={true}
      >
      {
        images.map((e)=>{
          return(
            <SlideItemPadding img={e.url}/>
          )
        })
      }
      </Slider>
    </SliderContainer>
  );
}



function Facility() {
  let [floor, setFloor] = useState(1)
  let [floorImage, setFloorImage] = useState(FacilityImage.filter(item => item.floor === 1))

  useEffect(()=>{
    setFloorImage(FacilityImage.filter(item => item.floor === floor))
  }, [floor])
  

  const StyledFacility = styled.div`
    display: flex;
    flex-direction: column;

    .line-deco {
      margin-top: 70px;
      height: 3.5px;
      width: 60px;
      background: linear-gradient(to right, rgb(0, 51, 161), rgb(102, 136, 211));
    }
    .facility-floor {
      width: 100%;
      margin-top: 50px;
      margin-bottom: 50px;
    }
    .facility-floor-img {
      width: 100%;
    }


    @media (max-width: 600px) {
      .facility-floor {
        width: 100%;
        margin-top: 30px;
        margin-bottom: 30px;
      }

      & > h3 {
        font-size: 16px;
      }
      & > p {
        font-size: 14px;
      }
    }
  `
  const ScrollFloor = styled.div`
    margin-top: 50px;
    overflow: auto;

    .scroll-wrap-floor {
      width: 100%;
      display: flex;
      flex-direction: row;
    }

    .scroll-element {
      display: flex;
      width: 120px;
      height: 50px;
      text-align: center;
      justify-content: center;
      align-items: center;
      background-color: #f7f3f3;
      color: #838282;
      flex-shrink: 0;
      cursor: pointer;
    }
    .scroll-element-selected {
      display: flex;
      width: 120px;
      height: 50px;
      text-align: center;
      justify-content: center;
      align-items: center;
      background-color: rgb(0, 51, 161);
      color:rgb(244, 243, 243);
      flex-shrink: 0;
      cursor: pointer;
    }

    @media (max-width: 600px) {
      margin-top: 30px;

      .scroll-element {
        display: flex;
        width: 90px;
        height: 40px;
        font-size: 14px;
        text-align: center;
        justify-content: center;
        align-items: center;
        background-color: #f7f3f3;
        color: #838282;
        flex-shrink: 0;
        cursor: pointer;
      }
      .scroll-element-selected {
        display: flex;
        width: 90px;
        height: 40px;
        font-size: 14px;
        text-align: center;
        justify-content: center;
        align-items: center;
        background-color: rgb(0, 51, 161);
        color:rgb(244, 243, 243);
        flex-shrink: 0;
        cursor: pointer;
      }
    }
  `

  const floors = [1, 2, 3]
  
  return(
    <StyledFacility>

      

      <div className="line-deco"/>
      <h3>시설 안내</h3>
      <p>홍지만 신경과는 각 층이 테마별로 구성되어 어쩌고 저쩌고...</p>

      <ScrollFloor>
        <div className="scroll-wrap-floor">
          {
            floors.map((e, i)=>{
              return (
                <div key={i} className={
                  e === floor ? 
                  "scroll-element-selected" : 
                  "scroll-element"
                } onClick={()=>{setFloor(e)}}>{`${e}층`}</div>
              )
            })
          }
        </div>
      </ScrollFloor>

      <div className="facility-floor">
        <img className="facility-floor-img" src={`/images/floor${floor}.png`}/>
      </div>
      <div className="facility-image">
        <h3>{`${floor}층 둘러보기`}</h3>
      </div>
      <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <AsNavFor images={floorImage}/>
      </div>
    </StyledFacility>
  )
}

export default Facility