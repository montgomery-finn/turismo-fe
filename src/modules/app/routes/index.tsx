import { Route, Routes } from "react-router-dom";
import Pacotes from "../pages/Pacotes";
import CreatePacote from "../pages/Pacotes/Create";
import CreatePasseio from "../pages/Passeios/Create";
import { Sidebar } from "flowbite-react";
import { HiOutlineUserAdd, HiInbox, HiShoppingBag, HiLogin } from 'react-icons/hi';
import Passeios from "../pages/Passeios";
import EditPasseio from "../pages/Passeios/Edit";

export default function AppRoutes() {
    return (        
        <Routes>
            <Route path="/pacotes" element={<Pacotes />} />
            <Route path="/pacotes/novo" element={<CreatePacote />} />
            <Route path="/passeios" element={<Passeios />} />
            <Route path="/passeios/novo" element={<CreatePasseio />} />
            <Route path="/passeios/edit/:id" element={<EditPasseio />} />
        </Routes>
    )
}