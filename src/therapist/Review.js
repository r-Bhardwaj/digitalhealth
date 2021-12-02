
import React,{useState} from 'react';

import ReactPlayer from "react-player"
import "./Review.css"
import {storage,ref,getDownloadURL,doc,db,getDoc} from "../firebase"
import {useLocation} from "react-router-dom"
import Header from "../Header"
import "./Review.css"
import { Line } from 'react-chartjs-2';
function Review() {
  const {state}=useLocation();
    const {id}=state
  const [day,setDay]=useState("")
  const [videoURL,setVideoURL]=useState("")

  const docRef = doc(db, 'angle', `${id}`,'Day1','Data');
  var min=0
  var max=0
  getDoc(docRef).then((docSnap)=>{
    // min=docSnap.data()["min"]
    // max=docSnap.data()["max"]
    console.log(docSnap)
    console.log(docSnap.data())
    
  });



    const change=(e)=>{
      setDay(e.target.value)
    }

    const onClickHandler=()=>{
      if (day==="")
      {
        alert("Select Day")
      }
      else
      {
        const name=day+".mp4"
        getDownloadURL(ref(storage, `/patients/${id}/ptVideos/${name}`))
  .then((url) => {
    setVideoURL(url)
    
  })

      }
    }



  return (
      <div>
        <div><Header/></div>
       <div className="capturemain">
       <div className="captureprofile-picture-container">
         <div className="captureprofile-picture-parent">
 
           <div className="captureprofile-picture">
           <div className="ReactPlayer">
           <ReactPlayer controls width="480px" height="240px" url={videoURL}/>
           </div>
           <div >
      <select className="Reviewlist" onChange={change}>
        <option value="...">...</option>   
    <option value="Day1">Day 1</option>
    <option value="Day2">Day 2</option>
    <option value="Day3">Day 3</option>
    <option value="Day4">Day 4</option>
    <option value="Day5">Day 5</option>
    </select>
    </div>
    <div></div>
    <div><button className="btn ReviewRecording" onClick={onClickHandler}>Show Video</button></div>
    
           
           </div>
           </div>
           </div>
       
    

    
        </div>
    </div>
  );
}

export default Review;