import React,{useState} from 'react'
import "./Home.css"
import { collection,getDocs,query,where,db } from '../firebase';
import Patient from "./Patient"
import Header from "../Header"
import "./Home.css"

const Home = () => {
    const [patients,setPatients]=useState([])

const s=()=>{
    const q = query(collection(db, "users"), where("role", "==", "Patient"));
    const r=[]
  getDocs(q).then((docSnap)=>{
    docSnap.forEach((doc) => {
        
      r.push(`${doc.id}`)
    }
    
  )
  setPatients(patients.concat(r))
})
}
if (patients.length===0){
    s()
}
    

    return (
        <div className="therapistHome">
            <div>
            <Header/>
            </div>
            
            <div className="list">
                
                {patients.map(x=>
                <div className="patientElement"><Patient uid={x}/></div>)}
            </div>
        </div>
        
    )
}

export default Home;