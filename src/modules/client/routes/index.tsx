import { Route, Routes } from "react-router-dom";
import Pacotes from "../pages/Pacotes";
import Users from "../pages/Users";
import Reservas from "../pages/Reservas";
import CreateReserva from "../pages/Reservas/Create";

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
            <Route path="/reservas/novo/:pacoteId" element={<CreateReserva />} />
        </Routes>
    )
}