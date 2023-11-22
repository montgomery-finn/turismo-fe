import { Button, Sidebar } from "flowbite-react";
import { HiUser, HiInbox, HiShoppingBag, HiPaperAirplane, HiLogout, HiPhotograph } from 'react-icons/hi';
import MyRoutes from "../public/routes";
import AppRoutes from "./routes";
import { useAuth } from "../shared/hooks/Auth";
import Navbar from "../shared/components/Navbar";


export default function AdminRoutes() {

    const { logOut } = useAuth();

    return (
        <div >

          <Navbar homeHref="/"
            links={[
              {href: '/pacotes', name: 'Pacotes'},
              {href: '/passeios', name: 'Passeios'},
              {href: '/users', name: 'Usuários'},
              {onClick: logOut, name: 'Logout'}
            ]}
          />
        <div className='m-4'>
          <AppRoutes />
        </div>
      </div>
    );
}