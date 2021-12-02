import React from 'react'
import "./HomeScreen.css"
import { auth } from '../firebase';
import {  useNavigate } from "react-router-dom";
import Header from "../Header"
import "./HomeScreen.css"

const HomeScreen = () => {
    const userID=auth.currentUser.uid
    const navigation=useNavigate();
 
    const handleEx=(d)=>{
        console.log(d)
        navigation("/Capture",{state:{day:d,user:userID}})
    }
    return (
        <div>
        <div><Header/></div>
        <div className="container">
             
             <div className="btn_container}">
                <div className="buttonDiv">
                <button onClick={() => handleEx('Day1')} className="button">
                    Day 1
                </button>
                </div>
                <div className="buttonDiv">
                <button onClick={() => handleEx('Day2')} className="button">
                    Day 2
                </button>
                </div>
                <div className="buttonDiv">
                <button onClick={() => handleEx('Day3')} className="button">
                    Day 3
                </button>
                </div>
                <div className="buttonDiv">
                <button onClick={() => handleEx('Day4')} className="button">
                    Day 4
                </button>
                </div>
                <div className="buttonDiv">
                <button onClick={() => handleEx('Day5')} className="button">
                    Day 5
                </button>
                </div>
                </div>
                </div>
        </div>
        
    )
}

export default HomeScreen;