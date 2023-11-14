import { Route, Routes } from "react-router-dom";
import Pacotes from "../pages/Pacotes";
import CreatePacote from "../pages/Pacotes/Create";
import CreatePasseio from "../pages/Passeios/Create";
import { Sidebar } from "flowbite-react";
import { HiOutlineUserAdd, HiInbox, HiShoppingBag, HiLogin } from 'react-icons/hi';
import Passeios from "../pages/Passeios";
import EditPasseio from "../pages/Passeios/Edit";
import Users from "../pages/Users";
import EditPacote from "../pages/Pacotes/Edit";
import CreateUser from "../pages/Users/Create";
import EditUser from "../pages/Users/Ediit";

export default function AppRoutes() {
    return (        
        <Routes>
            <Route path="/pacotes" element={<Pacotes />} />
            <Route path="/pacotes/novo" element={<CreatePacote />} />
            <Route path="/pacotes/edit/:id" element={<EditPacote />} />

            <Route path="/passeios" element={<Passeios />} />
            <Route path="/passeios/novo" element={<CreatePasseio />} />
            <Route path="/passeios/edit/:id" element={<EditPasseio />} />
            
            <Route path="/users" element={<Users />} />
            <Route path="/users/novo" element={<CreateUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
        </Routes>
    )
}