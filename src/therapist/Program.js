import React,{useState} from 'react'
import {storage,ref,uploadBytes} from "../firebase"
import {useLocation} from "react-router-dom"
import ReactPlayer from "react-player"
import Header from "../Header"
import "./Program.css"

function Program() {
    const {state}=useLocation();
    const {id}=state
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [videoFilePath, setVideoFilePath] = useState(null);
    const [exercise,setExercise]=useState("")
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
        const path=URL.createObjectURL(event.target.files[0])
        setVideoFilePath(path)
	};

	const filename="Day1.mp4"
    const reference = ref(storage,`/patients/${id}/program/${filename}`);
    const handleUpload=async ()=>{
        if (exercise===""){
            alert("Select Exercise!")
          }
          else
          {
            const metadata = {
                customMetadata: {
                  'exercise': `${exercise}`,
                }
              };
            await uploadBytes(reference,selectedFile,metadata).then((snapshot) => {
                console.log('Uploaded a blob or file!');
              });
          }
       
    }

    const change=(e)=>{
        setExercise(e.target.value)
    }
	return(
        <div>
        <div><Header/></div>
       <div className="capturemain">
       <div className="captureprofile-picture-container">
         <div className="captureprofile-picture-parent">
 
           <div className="captureprofile-picture">
           <div className="ReactPlayer">
           <ReactPlayer controls width="480px" height="240px" url={videoFilePath}/>
               </div>
               <div >
               <div className="ProgramUpload"><input type="file" name="file" onChange={changeHandler} /></div>
               <div className="ProgramUpload">
               <select onChange={change}>
        <option value="...">...</option>   
    <option value="Shoulder_Abduction">Shoulder Abduction</option>
    <option value="Shoulder_Extension">Shoulder Extension</option>
    <option value="Shoulder_Flexion">Shoulder Flexion</option>
    <option value="Hip_Extension">Hip Extension</option>
    </select>
    </div>
    <div className="ProgramUpload" ><button className="btn Recording" onClick={handleUpload}>Upload</button></div>
    </div>
               </div>
               </div>
               </div>
               </div>
        </div>
	)
}

export default Program
