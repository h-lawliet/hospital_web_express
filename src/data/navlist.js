// 페이지 구조 관련 변수
/*
각 목차와 목차별
이름, 링크, 페이지 상단 이미지, 하위목차
*/

export const navList = [
  {
    name: "본원소개",
    link: "/about",
    detail: ["인사말", "의료진 소개", "연구 활동", "진료 시간", "오시는길", "층별 안내"],
    topImg: "/images/image1.jpg"
  },
  {
    name: "특화센터",
    link: "/center",
    detail: ["모야모야 특화센터", "뇌졸중 특화센터", "두통 · 어지럼증 센터", "뇌졸중 · 치매 통합 예방센터", "운동 · 이완센터"],
    topImg: "/images/image1.jpg"
  },
  {
    name: "진료분야",
    link: "/appointment",
    detail: ["급성뇌졸중", "모야모야", "두통", "어지럼", "현훈", "뇌졸중 예방치료", "치매 예방치료", "노화 예방치료", "운동 치료", "이완 치료"],
    topImg: "/images/image1.jpg"
  },
  {
    name: "검사안내",
    link: "/examination",
    detail: ["뇌혈류생리검사실", "자율신경검사실", "어지럼검사실", "말초신경검사실", "뇌파검사실", "신경심리검사실", "운동분석치료실", "영상의학실"],
    topImg: "/images/image1.jpg"
  },
  {
    name: "공지사항",
    link: "/notice",
    detail: ["공지사항"],
    topImg: "/images/image1.jpg"
  },
  {
    name: "상담예약",
    link: "/reserve",
    detail: ["상담예약"],
    topImg: "/images/image1.jpg"
  },
]