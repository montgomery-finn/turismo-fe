import { Button, Sidebar } from "flowbite-react";
import { HiUser, HiInbox, HiShoppingBag, HiPaperAirplane, HiLogout, HiPhotograph } from 'react-icons/hi';
import MyRoutes from "../public/routes";
import AppRoutes from "./routes";
import { useAuth } from "../shared/hooks/Auth";
import Navbar from "../shared/components/Navbar";


export default function Admin() {

    const { logOut } = useAuth();

    return (
        <div >

          <Navbar 
            homeName="O sistema de reservas - Área da agência"
            homeHref="/"
            links={[
              {href: '/admin/pacotes', name: 'Pacotes'},
              {href: '/admin/passeios', name: 'Passeios'},
              {href: '/admin/reservas', name: 'Reservas'},
              {href: '/admin/users', name: 'Usuários'},
              {onClick: logOut, name: 'Logout'}
            ]}
          />
        <div className='m-4'>
          <AppRoutes />
        </div>
      </div>
    );
}