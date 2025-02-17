import styled from "styled-components"

function Greeting() {
  
  const StyledGreeting = styled.div`
    width: 100%;
    position: relative;
    padding-bottom: 50px;

    .greeting-deco {
      margin-top: 70px;
      margin-bottom: 70px;
      height: 3px;
      width: 60px;
      background: linear-gradient(to right, rgb(0, 51, 161), rgb(67, 110, 203));
    }

    .greeting-title {
      text-align: center;

      @media (max-width: 600px) {
        font-size: 16px;
      }

      @media (max-width: 1200px) and (min-width: 600px) {
        font-size: 18px;
      }

      @media (min-width: 1200px) {
        font-size: calc(0.08vw + 18px);
        font-weight: 600;
        color: rgb(0, 51, 161);
      }
    }

    .greeting-content > p {
      color: rgb(103, 101, 101);
      font-weight: 400;

      @media (max-width: 500px) {
        font-size: 14px;
        line-height: 30px;
        text-align: justify;
      }
      @media (min-width: 500px) and (max-width: 900px) {
        font-size: 15px;
        line-height: 32px;
        text-align: justify;
      }
      @media (min-width: 900px) {
        font-size: clamp(16px, calc(0.02vw + 15px), 18px);
        line-height: calc(35px + 0.01vw);
        text-align: justify;
      }
    }
    
    .greeting-end {
      padding-top: 10px;
      color: rgb(0, 0, 0);
      position: absolute;
      right: 0;
      bottom: 0;
    }
    #name {
      color: rgb(0, 51, 161);
      @media (min-width: 1200px) {
        font-size: calc(0.01vw + 25px);

      }
      @media (max-width: 1200px) {
        font-size: calc(1vw + 20px);
      }
    }
  `

  return (
    <StyledGreeting>
      <div className="greeting-deco"/>
      <div className="greeting-title">
        " 탁월한 전문성과 최선의 진료로 항상 여러분과 함께하는 홍지만신경과가 되겠습니다 "  
      </div>
      <img></img>
      <div className="greeting-content">
        <p>
          안녕하세요. 홍지만신경과 대표원장 홍지만입니다. <br/>
          저는 신경과 전문의로 23년, 그리고 아주대학교병원에서 급성 중증 뇌졸중을 진료하고 
          학생들과 레지던트, 전임의를 교육한 지 20년이 넘었습니다.
          이러한 경험을 바탕으로 신경계 질환으로 일상을 잃은 환자들이 다시
          평범한 삶으로 돌아갈 수 있도록 돕겠다는 사명을 가지고 병원을 개원하였습니다.
        </p>
        <p>
          평범한 11호님은 우리 주변에서 흔히볼수 있는 평범한 뚜벅이를 의미합니다. 
          이 이름처럼 저희병원은 모든 환자 한분 한분이 다시 평범한 일상으로 돌아갈 수 있도록 최선을 다하겠습니다. 
          저는 허혈 뇌졸중 및 모야모야질 환(뇌혈관이 점점 좁아지고 가늘어지는 질환)뿐 아니라 
          두개내혈관동맥경화 및 뇌혈관-조직 보호와 관련된 뇌졸중 환자의 새로운 치료법에 관하여 끊임 없이 연구해 왔습니다. 
          이 지식과 경험을 지역사회 환자들을 위해 활용하겠습니다. 
          또한, 두통, 어지럼증, 실신, 뇌전증 등 다양한 신경계 질환에 대해 정확한 검사와 적절한 치료를 제공합니다.
        </p>
        <p>
          저희 병원은 각 층마다 전문적인 테마로 구성되어 있습니다:
          **"11호님의 산책"**, **11호님의 희망"**, 그리고 **"11호님 을 위한 배려"**. 
          이러한 공간은 환자와 보호자 모두에게 편안함과 최고의 치료를 제공하도록 설계되었습니다. 
          특히, 급성 뇌졸중 환자를 위해 **대학병원 수준의 집중치료실과 영상실**을 갖추고 있어, 
          초기 진단부터 치료까지 한곳에서 신속하게 진행할 수 있습니다. 
          이를 통해 **신경학적 악화, 섬망, 내과적 합병증**과 같은 위험 요소를 최소화하고 환자의 치료 결과를 크게 향상시킬 수 있습니다. 
          또한, 환자의 상태에 따른 **맞춤형 재활-운동프로그램**을 제공 하며, 보호자에게도 자세히 설명하며 정확한 진단과 치료를 제공합니다. 
          더불어, **모야모야병 및 유사 질환을 위한 전문 클리닉**을 운영하며, 정밀한 진단 과치료를 제공합니다. 
          제가 직접 개발한 **최소침습시술**은 전신마취와 개두술 없이 국소마취로 진행되며, 
          급성기에 상태가 불안정한 환자들에게 큰 도움을 주었습니다. 
          이 시술은 지금까지 많은 환자에서 혈관 문합에 성공하며 효과를 입증하고 
          세계적인 저널에 다수 게재하여 한국의료의 위상을 올리기도 했습니다.
        </p>
        <p>
          신경계 질환에 대한 자세한 평가를 위해서 뇌혈관생리검사 (내막, 중막 검사), 
          뇌혈류초음파, 경동맥초음파, 맥파검사, 동맥경 화도검사, 혈압표기 검사, 연속혈압검사, 
          안저혈관검사, 뇌혈류기반기립경사검사, 비디오안진검사, 자율신경검사, 
          뇌건강 혈액 및 DNA 검사 등이 시행되고 있으며, 최신형 CT 및 MRI를 통해 여러분께 다가가겠습니다.
        </p>
        <p>
          저희만의 철학을 바탕으로 저와 직원들은 환자분들의 작은 기적을 함께 만들어 가고자 합니다. 
          환자 한 분 한 분이 다시 평범한 일상으로 돌아가는 그날까지 최선을 다하겠습니다. 
          언제든지 병원을 방문하시거나 전화로 문의 주시면 친절히 상담해 드리겠습니다.<br/>
          감사합니다.
        </p>
        <div className="greeting-end">
          신경과 전문의 &nbsp; <span id="name">홍지만</span>
          <img/>
        </div>
      </div>
    </StyledGreeting>
  )
}

export default Greeting