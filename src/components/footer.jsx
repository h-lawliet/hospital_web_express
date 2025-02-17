import styled from "styled-components"

function Footer() {
  
  const Footer = styled.div`
    background-color: #222222;
    color: #EEEEEE;

    & > h3 {
      padding-bottom: 20px;
      padding-top: 20px;
      margin: 0;
      font-size: 20px;
      font-weight: 500;
    }
    & > p {
      font-weight: 300;
      margin: 0;
      color: #BBBBBB;
      padding: 3px 0;
      font-size: 16px;
    }
    .copyright {
      font-weight: 100;
      font-size: 15px;
      opacity: 0.8;
    }
    .footer-logo {
      width: 200px;
      height: auto;
      padding-top: 30px;
      padding-bottom: 20px;
      opacity: 0.8;
    }

    @media (min-width: 1200px) {
      padding: 2vh 10vw;
    }
    @media (min-width: 600px) and (max-width: 1200px) {
      padding: 1.5vh 4vw;
      & > h3 {
        font-size: 18px;
      }
      & > p {
        font-size: 15px;
      }
      .copyright {
        font-size: 14px;
      }
      .footer-logo {
        width: 160px;
      }
    }
    @media (max-width: 600px) {
      padding: 1.5vh 4vw;

      & > h3 {
        font-size: 16px;
        padding-bottom: 10px;
        padding-top: 10px;
      }
      & > p {
        font-size: 12px;
      }
      .copyright {
        font-size: 11px;
      }
      .footer-logo {
        width: 140px;
        padding-bottom: 10px;
        padding-top: 20px;
      }
    }
  `
  return (
    <Footer>
      <h3>홍지만 신경과</h3>
      <p>
        수원시 팔달구 경수대로546 (인계동)
      </p>
      <p>
        Tel. 031.222.3317
      </p>
      <p>
        Fax. 031.222.3317
      </p>
      <p className="copyright">
        Copyright©2025 Dr.Hong's Special Neurology Centre.
        Designed by H_Lawliet
      </p>
      <img className="footer-logo" src="/images/logo_white.png"/>
    </Footer>
  )
}

export default Footer