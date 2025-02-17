import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import DOMPurify from "dompurify";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const SliderWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.translateX}%);
`;

const Box = styled.div`
  flex: 0 0 calc(${(props) => (props.$isSmallScreen ? "50%" : "25%")} - 10px);
  background-color: rgb(247, 247, 247);
  height: 30vh;
  color: rgb(65, 65, 65);
  margin: 5px;
  position: relative;
  border-radius: 2vh;
  cursor: pointer;

  &:hover {
    background-color: rgb(0, 51, 161);
    color: rgb(247, 247, 247);
  }
  &:hover .box-title {
    color: rgb(247, 247, 247);
  }

  .box-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .box-title {
    width: 90%;
    font-size: 2.6vh;
    font-weight: 500;
    margin-right: 2vh;
    margin-left: 2vh;
    margin-top: 2vh;
    color: rgb(0, 51, 161);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .box-content {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-right: 2vh;
    margin-left: 2vh;
  }
  .box-time {
    position: absolute;
    bottom: 0.5vh;
    color: rgb(190, 185, 185);
    margin-left: 2vh;
  }

  @media (max-width: 600px) {
    height: 27vh;
    margin: 5px;
    position: relative;
    border-radius: 2vh;
    cursor: pointer;

    .box-container {
      position: absolute;
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      padding: 10px;
    }
    .box-title {
      width: calc(100% - 20px);
      font-size: 14px;
      font-weight: 500;
      margin: 0;
      color: rgb(0, 51, 161);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .box-content {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 1vh 0;
      width: calc(100% - 20px);
      font-size: calc(12px + 0.05vw);
    }
    .box-time {
      position: absolute;
      font-size: calc(12px + 0.05vw);
      bottom: 10px;
      color: rgb(190, 185, 185);
      margin: 0;
    }
  }
`;

const ResponsiveSlider = () => {
  let [noticeList, setNoticeList] = useState([]);
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get("/notice", { withCredentials: true })
      .then((res) => {
        setNoticeList(res.data.sort((a, b) => b._id.localeCompare(a._id)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

  const boxes = noticeList.slice(0, 4);

  const [index, setIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1023);
  const [itemsPerPage, setItemsPerPage] = useState(isSmallScreen ? 2 : 4);

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth <= 1023;
      setIsSmallScreen(smallScreen);
      setItemsPerPage(smallScreen ? 2 : 4);
      setIndex(0); // 화면 크기 변경 시 index 초기화
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, boxes.length - itemsPerPage);

  const nextSlide = () => {
    setIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  useEffect(() => {
    if (isSmallScreen && noticeList.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isSmallScreen, noticeList]); // index도 의존성에 포함하여 업데이트 유지

  return (
    <Container>
      <SliderWrapper translateX={-index * (100 / itemsPerPage)}>
        {boxes.map((e, i) => (
          <Box key={i} $isSmallScreen={isSmallScreen} onClick={() => navigate("/notice/" + e._id)}>
            <div className="box-container">
              <div className="box-title">{e.title}</div>
              <p className="box-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(e.content) }}></p>
              <p className="box-time">{e.time}</p>
            </div>
          </Box>
        ))}
      </SliderWrapper>
    </Container>
  );
};

export default ResponsiveSlider;