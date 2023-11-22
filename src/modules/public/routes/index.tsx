
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Title from "../../shared/components/Title";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Pacotes from "../../admin/pages/Pacotes";
import Create from "../../admin/pages/Pacotes/Create";
import Auth from "../pages/Pacotes";
import Navbar from "../../shared/components/Navbar";

export default function PublicRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>  
  );
}