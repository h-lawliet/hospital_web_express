import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
];

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 50;
`;

const SlideImage = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IndicatorContainer = styled.div`
  position: absolute;
  bottom: 50%;
  right: 2vw;
  transform: translateY(50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 20px;
  z-index: 9999;
`;

const IndicatorDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "white" : "gray")};
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
`;

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(index); // 현재 이미지를 이전 인덱스로 저장
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <CarouselContainer>
      {prevIndex !== null && (
        <SlideImage
          key={`prev-${prevIndex}`}
          src={images[prevIndex]}
          alt="Previous Slideshow"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ zIndex: 1 }}
        />
      )}

      {/* 새로운 이미지 (Fade In) */}
      <SlideImage
        key={`current-${index}`}
        src={images[index]}
        alt="Current Slideshow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ zIndex: 2 }}
      />

      {/* 페이지 인디케이터 */}
      <IndicatorContainer>
        {images.map((_, i) => (
          <IndicatorDot key={i} $active={i === index} onClick={()=>{setIndex(i)}}/>
        ))}
      </IndicatorContainer>
    </CarouselContainer>
  )
}