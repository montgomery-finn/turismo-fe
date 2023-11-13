
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Title from "../../shared/components/Title";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Pacotes from "../../app/pages/Pacotes";
import Create from "../../app/pages/Pacotes/Create";
import Auth from "../pages";

export default function AuthRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

function Home() {
    return <Title>Esse é o sistema</Title>;
  }
  
  function About() {
    return <h2 className='text-red-500'>About</h2>;
  }
  
  function Users() {
    return <h2 className='text-red-500'>Users</h2>;
  }
  
  