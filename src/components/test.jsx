import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// 슬라이더 컨테이너
const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 600px; /* 필요에 따라 조정 */
  margin: 0 auto;
`;

// 슬라이드들을 감싸는 래퍼
const SliderWrapper = styled.div`
  display: flex;
  transition: ${({ isTransitioning }) => (isTransitioning ? 'transform 0.5s ease' : 'none')};
  transform: translateX(-${({ current }) => current * 100}%);
`;

// 개별 슬라이드
const Slide = styled.div`
  min-width: 100%;
  box-sizing: border-box;

  img {
    width: 100%;
    display: block;
  }
`;

// 페이지네이션(도트) 컨테이너
const Pagination = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

// 개별 도트 버튼
const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const Slider = ({ images, autoPlay, autoPlayTime }) => {
  const originalCount = images.length;
  const [current, setCurrent] = useState(0); // current: 0 ~ originalCount (마지막 인덱스는 첫 이미지의 클론)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);

  // 원본 이미지 배열에 첫 번째 이미지를 복제하여 마지막에 추가
  const slides = [...images, images[0]];

  // 다음 슬라이드 전환을 예약하는 함수 (setTimeout 사용)
  const scheduleNextSlide = () => {
    if (!autoPlay) return;
    clearTimeout(autoPlayRef.current);
    autoPlayRef.current = setTimeout(() => {
      setCurrent(prev => prev + 1);
    }, autoPlayTime);
  };

  // current 값이 변경될 때마다 다음 슬라이드를 예약
  useEffect(() => {
    scheduleNextSlide();
    return () => clearTimeout(autoPlayRef.current);
  }, [current, autoPlay, autoPlayTime]);

  // transitionend 이벤트 처리 (transform 프로퍼티에 한정)
  useEffect(() => {
    const handleTransitionEnd = (e) => {
      if (e.propertyName !== 'transform') return;
      if (current === originalCount) {
        // 클론 슬라이드에 도달한 경우, transition 없이 첫 슬라이드로 리셋
        setIsTransitioning(false);
        setCurrent(0);
        // 다음 프레임에 transition을 다시 활성화
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      }
    };

    const sliderNode = sliderRef.current;
    if (sliderNode) {
      sliderNode.addEventListener('transitionend', handleTransitionEnd);
    }
    return () => {
      if (sliderNode) {
        sliderNode.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, [current, originalCount]);

  // 페이지네이션 도트 클릭 시 해당 인덱스로 이동
  const goToSlide = (index) => {
    clearTimeout(autoPlayRef.current);
    setCurrent(index);
  };

  return (
    <SliderContainer>
      <SliderWrapper ref={sliderRef} current={current} isTransitioning={isTransitioning}>
        {slides.map((imgSrc, index) => (
          <Slide key={index}>
            <img src={imgSrc} alt={`Slide ${index % originalCount + 1}`} />
          </Slide>
        ))}
      </SliderWrapper>
      <Pagination>
        {images.map((_, index) => (
          <Dot
            key={index}
            active={current === index || (current === originalCount && index === 0)}
            onClick={() => goToSlide(index)}
          />
        ))}
      </Pagination>
    </SliderContainer>
  );
};

export default Slider;