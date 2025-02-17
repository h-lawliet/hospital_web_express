import styled from "styled-components"
import PageContainer from "../components/pageContainer.jsx"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { appointmentData } from "../data/appointmentdata.js"

const Appointmentcontent = styled.div`
  .line-deco {
    margin-top: 70px;
    height: 3.5px;
    width: 60px;
    background: linear-gradient(to right, rgb(0, 51, 161), rgb(67, 110, 203));
  }

  .appointment-img {
    padding-top: 5vh;
    width: 100%;
  }
  .appointment-img > img {
    width: 100%;
  }
  
  .appointment-content {
    line-height: 2em;
    font-size: 1em;
    color: rgb(103, 101, 101);
    font-weight: 400;
  }

  .appointment-bold {
    padding-top: 3vh;
  }

  .appointment-bold > p {
    color: rgb(0, 51, 161);
    font-weight: 500;
    font-size: 1.2em;
    margin-left: 1vw;
    text-align: center;
  }

  @media (max-width: 600px) {
    .appointment-content {
      line-height: 30px;
      font-size: 14px;
      color: rgb(103, 101, 101);
      font-weight: 400;
      text-align: justify;
    }

    .appointment-bold > p {
      color: rgb(0, 51, 161);
      font-weight: 500;
      font-size: 14.5px;
      margin-left: 1vw;
      text-align: center;
    }
  }
`

function AppointmentContent() {

  let {id} = useParams()
  let [appointmentDataIndex, setAppointmentDataIndex] = useState(
    appointmentData[id]
  )

  useEffect(()=>{
    setAppointmentDataIndex(appointmentData[id])
  }, [id])

  return (
    <Appointmentcontent>
      <div className="line-deco"/>
      <div className="appointment-img">
        <img src={appointmentDataIndex.img}/>
      </div>
      {
        appointmentDataIndex.contents.map((e, i)=>{
          return(
            <p className="appointment-content" key={i}>{e}</p>
          )
        })
      }
      <div className="appointment-bold">
        <p>{appointmentDataIndex.bold}</p>
      </div>
    </Appointmentcontent>
  )
}

function Appointment(props) {
  return(
    <PageContainer item={props.item} content={<AppointmentContent/>}/>
  )
}

export default Appointment