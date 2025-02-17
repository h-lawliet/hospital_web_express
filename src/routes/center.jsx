import styled from "styled-components"
import PageContainer from "../components/pageContainer.jsx"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { centerData } from "../data/centerdata.js"

const Centercontent = styled.div`
  .line-deco {
    margin-top: 70px;
    height: 3.5px;
    width: 60px;
    background: linear-gradient(to right, rgb(0, 51, 161), rgb(67, 110, 203));
  }
  & > h2 {
    font-weight: 800;
    font-size: 1.2em;
    padding-bottom: 1em;
    line-height: 2em;
  }
  .center-content {
    line-height: 2em; 
    font-size: 1em;
    color: rgb(103, 101, 101);
    font-weight: 400;
    text-align: justify;
  }
  
  & > hr {
    margin: 2em 10%;
  }

  & > ul {
    padding-left: 20px;
  }
  .center-clinics {
    line-height: 2em;
    font-size: 1em;
    color: rgb(103, 101, 101);
    font-weight: 400;
    padding-bottom: 0.4em;
    text-align: justify;
  }

  @media (max-width: 600px) {
    & > h2 {
      font-weight: 800;
      font-size: 16px;
      padding-bottom: 1em;
      line-height: 30px;
    }
    .center-content {
      line-height: 30px; 
      font-size: 14px;
      color: rgb(103, 101, 101);
      font-weight: 400;
      text-align: justify;
    }
    
    & > hr {
      margin: 30px 10%;
    }

    & > ul {
      padding-left: 20px;
    }
    .center-clinics {
      line-height: 2em;
      font-size: 14.5px;
      color: rgb(103, 101, 101);
      font-weight: 400;
      padding-bottom: 0.4em;
      text-align: justify;
    }
  }
`

function CenterContent() {

  let {id} = useParams()
  let [centerDataIndex, setCenterDataIndex] = useState(
    centerData[id]
  )

  useEffect(()=>{
    setCenterDataIndex(centerData[id])
  }, [id])

  return (
    <Centercontent>
      <div className="line-deco"/>
      <h2>{centerDataIndex.title}</h2>
      {
        centerDataIndex.contents.map((e, i)=>{
          return(
            <p className="center-content" key={i}>{e}</p>
          )
        })
      }
      <div className="center-img">
        
      </div>
      <hr/>
      <ul>
      {
        centerDataIndex.clinics.map((e, i)=>{
          return(
            <li className="center-clinics" key={i}>{e}</li>
          )
        })
      }
      </ul>
    </Centercontent>
  )
}

function Center(props) {
  return(
    <PageContainer item={props.item} content={<CenterContent/>}/>
  )
}

export default Center