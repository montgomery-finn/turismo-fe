import { Button, Sidebar } from "flowbite-react";
import { HiUser, HiInbox, HiShoppingBag, HiPaperAirplane, HiLogout, HiPhotograph } from 'react-icons/hi';
import MyRoutes from "../public/routes";
import AppRoutes from "./routes";
import { useAuth } from "../shared/hooks/Auth";
import Navbar from "../shared/components/Navbar";


export default function Client() {

    const { logOut } = useAuth();

    return (
        <div >
          <Navbar 
            homeName="O sistema de reservas - Área da cliente"
            homeHref="/"
            links={[
              {href: '/client/pacotes', name: 'Pacotes'},
              {href: '/client/reservas', name: 'Reservas'},
              {onClick: logOut, name: 'Logout'}
            ]}
          />
        <div className='m-4'>
          <AppRoutes />
        </div>
      </div>
    );
}