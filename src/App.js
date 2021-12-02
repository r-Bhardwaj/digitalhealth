import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen"
import Capture from "./screens/Capture"
import Upload from "./screens/Upload"
import Home from "./therapist/Home"
import Program from "./therapist/Program"
import Review from "./therapist/Review"
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/capture" element={<Capture />}/>          
          <Route path="/login" element={<LoginScreen />}/>
          <Route path="/upload" element={<Upload />}/>
          <Route path="/" element={<LoginScreen />}/>
          <Route path="/thome" element={<Home />}/>
          <Route path="/program" element={<Program />}/>
          <Route path="/review" element={<Review />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
