import { Route, Routes } from "react-router-dom";
import Pacotes from "../pages/Pacotes";
import Users from "../pages/Users";
import Reservas from "../pages/Reservas";
import CreateReserva from "../pages/Reservas/Create";
import EditReserva from "../pages/Reservas/Edit";
import ShowReserva from "../pages/Reservas/Show";
import Details from "../pages/Pacotes/Details";

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
            <Route path="/pacotes/details/:id" element={<Details />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/reservas/novo/:pacoteId" element={<CreateReserva />} />
            <Route path="/reservas/edit/:reservaId" element={<EditReserva />} />
            <Route path="/reservas/show/:reservaId" element={<ShowReserva />} />
        </Routes>
    )
}