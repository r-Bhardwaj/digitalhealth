import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Patient.css"

function Patient(props) {
    const navigate=useNavigate()
    const handleProgram=()=>{
        navigate("/program",{state:{id:props.uid}})
    }

    const handleReview=()=>{
        navigate("/review",{state:{id:props.uid}})
    }
    return (
        <div className="PatientMain">
            <li className="item">
      <figure>
        <blockquote>
          <p>Patient</p>
        </blockquote>
        <figcaption>{props.uid}</figcaption>
      </figure>
      <div className="Patient">
      <div>
      <button className='btn PatientRecording' onClick={handleProgram} >
        Update Program
      </button>
      </div>
      <div>
      <button className='btn PatientRecording' onClick={handleReview} >
        Review
      </button>
      </div>
    </div>
    </li>
        </div>
    )
}

export default Patient
