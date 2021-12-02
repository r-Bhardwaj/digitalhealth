
import React,{useRef,useState} from 'react';

import ReactPlayer from "react-player"
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import Webcam from 'react-webcam'
import { drawKeypoints, drawSkeleton } from "./utilities";
import "./Capture.css"
import { useNavigate,useLocation } from "react-router-dom";
import {storage,ref,getDownloadURL,getMetadata} from "../firebase"
import Header from "../Header"


function Capture() {
  const {state}=useLocation();
  const {day,user}=state
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording,setRecording]=useState(false)
  const [recordedChunks, setRecordedChunks] = useState([]);
  const navigate = useNavigate();
  const [program,setProgram]=useState('')
  const [exercise,setExercise]=useState("")
  const [mnAngle,setMnAngle]=useState(400)
  const [mxAngle,setMxAngle]=useState(-100)
  var timeout;
  getDownloadURL(ref(storage, `patients/${user}/program/Day1.mp4`))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'
    setProgram(url)
    // This can be downloaded directly:
    
  })

  getMetadata(ref(storage, `patients/${user}/program/Day1.mp4`))
  .then((metadata) => {
    // Metadata now contains the metadata for 'images/forest.jpg'
    const meta=metadata["customMetadata"]["exercise"]
    setExercise(meta)
  })

 tf.ready()


 //  Load BlazePose
 const runBlazePose = async () => {

  const model = poseDetection.SupportedModels.BlazePose;
  const detectorConfig = {
    runtime: 'tfjs',
    enableSmoothing: true,
    modelType: 'full'
  };
  const detector = await poseDetection.createDetector(model, detectorConfig);
  timeout=setInterval(() => {
    detect(detector);
  }, 100);
  console.log(timeout)
};

const angle=(keypoints)=>{
  const a=[]
  const b=[]
  const c=[]
  var minAngle;
  var maxAngle;
  switch(exercise) {
    case "Hip_Extension":
      a.push(keypoints[12].x,keypoints[12].y)
      b.push(keypoints[24].x,keypoints[24].y)
      c.push(keypoints[28].x,keypoints[28].y)
      minAngle=0
      maxAngle=30
      break;
    case "Shoulder_Abduction":
      a.push(keypoints[23].x,keypoints[23].y)
      b.push(keypoints[11].x,keypoints[11].y)
      c.push(keypoints[13].x,keypoints[13].y)
      minAngle=0
      maxAngle=150
      break;
      case "Shoulder_Extension":
        a.push(keypoints[24].x,keypoints[24].y)
        b.push(keypoints[12].x,keypoints[12].y)
        c.push(keypoints[14].x,keypoints[14].y)
        minAngle=0
      maxAngle=150
      break;
      case "Shoulder_Flexion":
        a.push(keypoints[23].x,keypoints[23].y)
        b.push(keypoints[11].x,keypoints[11].y)
        c.push(keypoints[13].x,keypoints[13].y)
        minAngle=0
      maxAngle=150
      break;
    default:
      // code block
  }
  const radians=Math.atan2(c[1]-b[1],c[0]-b[0]) - Math.atan2(a[1]-b[1],a[0]-b[0])
  const angle=Math.abs((radians*180.0)/Math.PI)
  if (angle<mnAngle)
  {
    setMnAngle(angle)
  }
  if (angle>mxAngle)
  {
    setMxAngle(angle)
  }
}

const detect = async (detector) => {
  if (
    typeof webcamRef.current !== "undefined" &&
    webcamRef.current !== null &&
    webcamRef.current.video.readyState === 4
  ) {
    // Get Video Properties
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Make Detections
    const estimationConfig = {flipHorizontal: true};
    const timestamp = performance.now();
    
    const pose = await detector.estimatePoses(video, estimationConfig, timestamp);
    angle(pose[0].keypoints)
  
    if (pose===undefined)
    {
      
    }
    else
    {
      drawCanvas(pose[0].keypoints, video, videoWidth, videoHeight, canvasRef);
    }
   
  }
};

const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
  const ctx = canvas.current.getContext("2d");
  canvas.current.width = videoWidth;
  canvas.current.height = videoHeight;
  drawKeypoints(pose, 0.6, ctx);
  drawSkeleton(pose, 0.7, ctx);
};

const handleStartCaptureClick = React.useCallback(() => {
  setRecording(true);
  mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
    mimeType: "video/mp4"
  });
  mediaRecorderRef.current.addEventListener(
    "dataavailable",
    handleDataAvailable
  );
  mediaRecorderRef.current.start();
  setTimeout(() => {
    handleStopCaptureClick()
  }, 30000);
}, [webcamRef, setRecording, mediaRecorderRef]);

const handleDataAvailable = React.useCallback(
  ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
      const s=URL.createObjectURL(data)
      navigate("/upload",{state:{ur:data,source:s,name:day,ui:user,minAngle:mnAngle,maxAngle:mxAngle}});
    }
  },
  [setRecordedChunks]
);

const handleStopCaptureClick = React.useCallback(() => {
  clearInterval(timeout)
  mediaRecorderRef.current.stop();
  setRecording(false);
}, [mediaRecorderRef, webcamRef, setRecording]);

if (recording===true)
{
  setTimeout(function () {
    runBlazePose();
    },5000);
}




  return (
    <div>
       <div><Header/></div>
      <div className="capturemain">
      <div className="captureprofile-picture-container">
        <div className="captureprofile-picture-parent">

          <div className="captureprofile-picture">
             
          <div className="ReactPlayer">
            <ReactPlayer controls width="480px" height="240px" url={program}/>
          </div>
              <div className="center">
              <Webcam
          ref={webcamRef}
          audio={false}       
          style={{
            position: "absolute",
            marginLeft: "35%",
            // marginRight: "auto",
            marginTop:30,
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 480,
            height: 200,
          }}
        />
             
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "35%",
            marginRight: 20,
            marginTop:30,
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 480,
            height: 200,
          }}
        >
           

        </canvas>
              </div>
              <div> {recording ? (
        <button className="btn Recording" onClick={handleStopCaptureClick}>Stop Recording</button>
      ) : (
        <button className="btn Recording"  onClick={handleStartCaptureClick}>Start Recording</button>
      )}</div>
           
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Capture;

