import React from 'react'
import {storage,ref,uploadBytes,doc,db,setDoc} from "../firebase"
import {useLocation} from "react-router-dom"
import ReactPlayer from "react-player"
import { useNavigate } from 'react-router-dom'
import Header from "../Header"
import "./Upload.css"
function Upload() {
    const {state}=useLocation();
    const navigate=useNavigate();
    const { ur, source,name,ui,minAngle,maxAngle } = state;
    const filename=name+".mp4"

    const userRef = doc(db, 'angle', `${ui}`,`${name}`,'data');
    setDoc(userRef, { min: `${minAngle}`,max:`${maxAngle}` }, { merge: true });


    const reference = ref(storage,`/patients/${ui}/ptVideos/${filename}`);
    const handleUpload=async ()=>{
        await uploadBytes(reference,ur).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            navigate("/home")
          });
    }

    return (
        <div>
        <div><Header/></div>
       <div className="capturemain">
       <div className="captureprofile-picture-container">
         <div className="captureprofile-picture-parent">
 
           <div className="captureprofile-picture">
              
           <div className="ReactPlayer">
             <ReactPlayer controls width="480px" height="240px" url={`${source}`}/>
           </div>
            
           <div> 
           <button className="btn Recording" onClick={handleUpload}> Upload</button>
         </div>
            
            </div>
        </div>
        </div>
        </div>
        </div>
        
    )
}

export default Upload
