import styled from "styled-components"

const Boxfooter = styled.div`
  width: 100%;
  background-color: rgb(247, 247, 247);

  & > h3 {
    margin: 0;
    padding-left: 15px;
    padding-top: 15px;
    color: rgb(91, 90, 90);
    font-size: 1em;
  }
  & > p {
    display: flex;
    align-items: center;
    color: rgb(124, 122, 122);
    padding-left: 20px;
    font-size: 15px;
  }
`

function BoxFooter() {
  return (
    <Boxfooter>
      <h3>진료시간 및 연락처</h3>
      <p>
        <img src="/images/call_icon.png" style={{width: "17px"}}/>
        Tel. 031-222-3317  
      </p>
      <span>

      </span>
    </Boxfooter>
  )
}

export default BoxFooter