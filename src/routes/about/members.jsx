import { motion } from 'framer-motion';
import styled from 'styled-components';


const Styledmembers = styled.div`
  width: 100%;

  .member-container {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .line-deco {
    margin-top: 70px;
    height: 3.5px;
    width: 60px;
    background: linear-gradient(to right, rgb(0, 51, 161), rgb(67, 110, 203));
  }
  
  .motion-member-img {
    width: 45%;
    height: auto;
    position: relative;
    display: inline-block;
    padding: 10px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .member-image-1::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 25px;
    height: 35px;
    border-top: 2px solid rgb(67, 110, 203);
    border-left: 2px solid rgb(67, 110, 203);
  }
  .member-image-1::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25px;
    height: 35px;
    border-right: 2px solid rgb(67, 110, 203);
    border-bottom: 2px solid rgb(67, 110, 203);
  }

  .motion-member-text {
    display: inline-block;
    position: relative;
  }

  .member-name {
    display: inline;
    color: rgb(80, 78, 78);
    font-size: 35px;
    padding: 20px;
  }
  .member-name-2 {
    font-size: 24px;
    color: rgb(115, 113, 113);
  }
  .member-name-3 {
    padding: 20px;
    color: rgb(0, 51, 161);
    font-weight: 500;
    font-size: 18px;
  }
  
  ul {
    color: rgb(115, 113, 113);
    line-height: 2em;
    margin-top: 30px;
  }

  & > hr {
    margin: 8vh 10%;
  }

  @media (max-width: 700px) {
    .member-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .line-deco {
      margin-top: 70px;
      height: 3.5px;
      width: 60px;
      background: linear-gradient(to right, rgb(0, 51, 161), rgb(67, 110, 203));
    }
    
    .motion-member-img {
      width: 80%;
      height: auto;
      position: relative;
      display: inline-block;
      padding: 10px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 20px;
    }

    .motion-member-text {
      display: inline-block;
      position: relative;
      text-align: justify;
      font-size: 14px;
      margin-top: 20px;
    }

    .member-name {
      display: inline;
      color: rgb(80, 78, 78);
      font-size: 30px;
      padding: 15px;
      padding-left: 20px;
    }
    .member-name-2 {
      font-size: 22px;
      color: rgb(115, 113, 113);
    }
    .member-name-3 {
      padding: 15px;
      padding-left: 20px;
      color: rgb(0, 51, 161);
      font-weight: 500;
      font-size: 16px;
    }
    
    ul {
      color: rgb(115, 113, 113);
      line-height: 2em;
      margin-top: 20px;
      padding-left: 20px;
    }
  }
`


function Members() {
  return (
    <Styledmembers>
      <div className="line-deco"/>
      <h2></h2>
      <div className='member-container'>
        <motion.div
          className='motion-member-img'
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 2,
            x: { duration: 1 },
          }}
        ><img className='member-image-1' src='/images/member_img_1.png' style={{
          width: "100%", height: "auto", borderRadius: "20px"
        }}/>
        </motion.div>
        <motion.div
          className='motion-member-text'
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 2,
            x: { duration: 1 },
          }}
        >
        <h3 className='member-name'>홍지만</h3><span className='member-name-2'>대표원장</span>
        <div className='member-name-3'>신경과 전문의 / 뇌졸중 인증의</div>
        <ul>
          <li>2007년: 의학 박사학위 취득</li>
          <li>2013년~2014년: 미국 텍사스 메디컬센터에서 신경계 집중치료학 교환교수로 활동하며 귀국하고, 
            한국에서 신경집중치료 분야의 전문성을 강화하고 국내 전문가를 지속적으로 양성하였음.</li>
          <li>2015년~2021년: 아주대학교 의과대학 신경과학교실 주임교수 및 임상과장으로 6년간 임명되어, 
            신경과의 전반적인 교육과 임상 진료를 이끌었음.</li>
          <li>2018년: 아주대학교병원 신경과 정년 보장교수(Tenure)로 임명되어, 뇌졸중 치료와 연구</li>
          <li>2021년: 아주대학교 일반대학원 융합의과학과 학과장으로 취임하여, 
            융합-의과학 연구 및 석-박사 지도</li>
          <li>대한뇌졸중학회 초대 병원전단계위원장 역임 (한국형 뇌졸중 
            캠페인 “이웃-손-발-시선” 창시, 소방청과 MOU)</li>
          <li>대한신경집중치료학회 교육이사 (신경집중 Hand zone workshop: NICE 아카데미 개발) 
            / 정책이사 역임 (아시아태평양 신경집중치료학회 국제교류 위원장)</li>
          <li>대한신경초음파학회 학술이사 / 연구이사 역임</li>
          <li>現) 전자약 명품화 연구회 부회장</li>
        </ul>
        </motion.div>
      </div>
      <hr/>
    </Styledmembers>
  )
}

export default Members