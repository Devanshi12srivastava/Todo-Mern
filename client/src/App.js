import Landing from "./Landing/Landing";
import { Routes,Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import About from "./pages/About/About";
import Todolist from "./Todo/Todolist";
import {Toaster} from "react-hot-toast";
import Homepages from "./Home/Homepages";

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Landing/>}/>
       <Route path="/home" element={<Homepages/>}/>
       <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
     <Route path="/about" element={<About/>}/>
      <Route path="/todolist" element={<Todolist/>}/>

    </Routes>
     <Toaster/>
    </div>
  );
}

export default App;
