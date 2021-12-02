import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css";
import { useState } from "react";
import {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,doc,setDoc,db,getDoc} from "../firebase";
import "./LoginScreen.css"
import logo from "../logo.png"
function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRole]=useState('');
  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        const id=auth.user.uid;
        const docRef = doc(db, "users",`${id}`);
        var role=""
        getDoc(docRef).then((docSnap)=>{
          role=docSnap.data()["role"]
          if (role==="Patient")
          navigate("/home");
          else
          navigate("/thome")
        });
        
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    if (role===""){
      alert("Select your role!")
    }
    else{
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          const id=auth.user.uid;
          const userRef = doc(db, 'users', `${id}`);
          setDoc(userRef, { role: `${role}` }, { merge: true });
          if (role==="Patient")
          navigate("/home");
          else
          navigate("/thome")
        }
      })
      .catch((error) => alert(error.message));
    }
  };

  const change=(e)=>{
    setRole(e.target.value)
   }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src={logo}
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
       
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login__signInButton"
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>
        <p>
          By signing in you agree to the Conditions of Use & Sale.Please see our
          Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>
        <p>Choose your role</p>
        <select onChange={change}>
        <option value="...">...</option>   
    <option value="Patient">Patient</option>
    <option value="Therapist">Therapist</option>
    </select>
        <button className="login__registerButton" onClick={register}>
          Create your PTHome Account
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
