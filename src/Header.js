import React, {useState} from "react";
import "./Header.css";

import { Link,useNavigate } from "react-router-dom";
import { signOut, auth,doc,db,getDoc } from "./firebase";
import logo from "./logo.png"
function Header() {
    const navigation=useNavigate()
    const [loc,setLoc]=useState("")
  const handleSignOut = (e) => {
    e.preventDefault()
    signOut(auth).then(()=>{
        navigation("/login")
    })
    .catch(error=>alert(error.message))
  };

  const userID=auth.currentUser.uid
  const docRef = doc(db, "users",`${userID}`);
  getDoc(docRef).then((docSnap)=>{
    const role=docSnap.data()["role"]
    if (role==="Patient")
    setLoc("/home");
    else
    setLoc("/thome")
  });

  return (
    <div className="header">
      <div className="logo">
      <Link to={loc}>
        <img
          className="header__logo"
          src={logo}
          alt=""
        />
      </Link>
      </div>

    <div className="SignOut">
        <button onClick={handleSignOut} className="SignOutbutton">Sign Out</button>
    </div>
      
    </div>

  );
}

export default Header;


// import React from 'react'

// export default function Header() {
//   return (
//     <div>
//       Header
//     </div>
//   )
// }
