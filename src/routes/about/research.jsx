import styled from "styled-components";
import axios from "axios"
import { useEffect, useState } from "react";
import api from "../../api";

const BarData = [
  {
    year: 2024,
    number: 4
  },
  {
    year: 2023,
    number: 5
  },
  {
    year: 2022,
    number: 13
  },
  {
    year: 2021,
    number: 8
  },
  {
    year: 2020,
    number: 11
  },
  {
    year: 2019,
    number: 9
  },
  {
    year: 2018,
    number: 13
  },
  {
    year: 2017,
    number: 6
  },
]

const Graph = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 3vw;
  margin-right: 3vw;
  overflow: auto;
  height: 330px;
  padding-top: 10vh;

  .y-axis {
    width: 15px;
    margin-bottom: 30px;
    border-right: 1px solid #e5e5e5;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
  }
  .y-axis > div {
    font-size: 10px;
    text-align: center;
    font-weight: 200;
  }
  .graph-item {
    display: flex;
    flex-direction: column-reverse;
    padding-left: calc(2vw + 10px);
    align-items: center;
  }
  .colored {
    flex-grow: 1;
    width: 25px;
    background: linear-gradient(to top left,  rgb(0, 51, 161), rgb(67, 110, 203));
  }
  .graph-year {
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
    font-weight: 300;
    color: gray;
  }

  @media (max-width: 600px) {
    .graph-item {
      display: flex;
      flex-direction: column-reverse;
      padding-left: calc(2vw + 10px);
      align-items: center;
    }
    .colored {
      flex-grow: 1;
      width: 20px;
      background: linear-gradient(to top left,  rgb(0, 51, 161), rgb(67, 110, 203));
    }
    .graph-year {
      margin-top: 10px;
      text-align: center;
      font-size: 12px;
      font-weight: 300;
      color: gray;
    }
  }
`
const ScrollYear = styled.div`
  margin-top: 50px;
  overflow: auto;

  .scroll-wrap {
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
    margin-top: 40px;
    overflow: auto;

    .scroll-wrap {
      width: 100%;
      display: flex;
      flex-direction: row;
    }

    .scroll-element {
      display: flex;
      width: 100px;
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
      width: 100px;
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

const ResearchList = styled.div`
  margin-top: 20px;
  border-top: 1px solid rgb(0, 51, 161);

  .research-item {
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 16px;
    border-bottom: 1px solid #e5e5e5;
  }

  #journal {
    font-family: 'Times New Roman', Times, serif;
    font-size: 19px;
    font-weight: 600;
    padding-bottom: 2px;
  }
  #info {
    color: rgb(49, 48, 48);
    font-weight: 300;
    padding-bottom: 7px;
    font-size: 1em;
  }
  #title{
    color: rgb(0, 51, 161);
    font-weight: 400;
    font-size: 1em;
    padding-bottom: 2px;
  }
  #title > a {
    text-decoration: none;
    color: inherit;
  }
  #author {
    color: rgb(49, 48, 48);
    font-weight: 300;
    font-size: 1em;
  }


  @media (max-width: 600px) {
    margin-top: 20px;
    border-top: 1px solid rgb(0, 51, 161);

    .research-item {
      padding-top: 20px;
      padding-bottom: 20px;
      font-size: 13.5px;
      border-bottom: 1px solid #e5e5e5;
    }

    #journal {
      font-family: 'Times New Roman', Times, serif;
      font-size: 17px;
      font-weight: 600;
      padding-bottom: 2px;
    }
    #info {
      color: rgb(49, 48, 48);
      font-weight: 300;
      padding-bottom: 7px;
      font-size: 1em;
    }
    #title{
      color: rgb(0, 51, 161);
      font-weight: 400;
      font-size: 1em;
      padding-bottom: 2px;
    }
    #title > a {
      text-decoration: none;
      color: inherit;
    }
    #author {
      color: rgb(49, 48, 48);
      font-weight: 300;
      font-size: 1em;
    }
  }
`

function Research() {

  let [selectedYear, setSelectedYear] = useState(2024)
  let [ResearchData, setResearchData] = useState([])
  let [filtered, setFiltered] = useState([])
  let [isSmall, setIsSmall] = useState(false)

  const highlight = "Ji Man Hong"

  const handleResize = () => {
    setIsSmall(window.innerWidth <= 1600)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [filtered])

  useEffect(()=>{
    api.get("/research", {withCredentials: true}).then((res)=>{
      setResearchData(res.data)
    }).catch((err)=>{
      console.log(err)
      alert(err + " 논문 데이터를 가져오지 못했습니다.")
    })
  }, [])

  useEffect(()=>{
    setFiltered(ResearchData.filter(item => item.year == selectedYear)
    .sort((a, b) => a._id.localeCompare(b._id)))
  }, [selectedYear, ResearchData])


  return(
    <>
    <Graph>
      <div className="y-axis">
        <div>0</div><div>5</div><div>10</div><div>15</div>
      </div>
      {
        BarData.map((e, i)=>{
          return(
            <div className="graph-item" style={{
              height: `${e.number * 20 + 30}px`,
              marginTop: `${300-e.number*20}px`
            }}>
              <div className="graph-year">{e.year}</div>
              <div className="colored"></div>
            </div>
          )
        })
      }
    </Graph>

    <ScrollYear>
      <div className="scroll-wrap">
      {
        BarData.map((e, i)=>{
          return(
            <div key={i} className={
              e.year === selectedYear ? 
              "scroll-element-selected" : 
              "scroll-element"
            } onClick={()=>{setSelectedYear(e.year)}}>{e.year}</div>
          )
        })
      }
      </div>
    </ScrollYear>

    {isSmall ? <div style={{
      color: "rgb(0, 51, 161)",
      fontSize: "11px",
      paddingTop: "10px"
    }}>
      *좌우로 스크롤하여 확인할 수 있습니다
    </div> : null}

    <ResearchList>
      {
        filtered.map((e, i)=>{
          return(
            <div className="research-item">
              <div id="journal">{e.journal}</div>
              <div id="info">
                <span>DOI: {e.doi}</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>IF: {e.impact}</span>
              </div>
              <div id="title"><a href={e.url} target="blank">{e.title}</a></div>
              <div id="author">
              {e.author.split(new RegExp(`(${highlight})`, "gi")).map((part, index) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                  <strong key={index} style={{ fontWeight: "600"}}>
                    {part}
                  </strong>
                ) : (
                  part
                )
              )}
              </div>
            </div>
          )
          
        })
      }
      
    </ResearchList>
    </>
  )
}

export default Research