import { Route, Routes } from "react-router-dom";
import Pacotes from "../pages/Pacotes";
import { Sidebar } from "flowbite-react";
import { HiOutlineUserAdd, HiInbox, HiShoppingBag, HiLogin } from 'react-icons/hi';
import Users from "../pages/Users";
import Reservas from "../pages/Reservas";

export default function AppRoutes() {
    return (        
        <Routes>
            <Route path="/client/*" element={<SubRoutes />} />
        </Routes>

    )
}

function SubRoutes() {
    return (
        <Routes>
            <Route path="/pacotes" element={<Pacotes />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reservas" element={<Reservas />} />
        </Routes>
    )
}