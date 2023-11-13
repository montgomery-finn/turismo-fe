import { Button, Sidebar } from "flowbite-react";
import { HiOutlineUserAdd, HiInbox, HiShoppingBag, HiPaperAirplane, HiLogout } from 'react-icons/hi';
import MyRoutes from "../auth/routes";
import AppRoutes from "./routes";
import { useAuth } from "../shared/hooks/Auth";


export default function MyApp() {

    const { logOut } = useAuth();

    return (
        <div className='flex'>
        <Sidebar aria-label="Default sidebar example" className="min-h-screen   bg-green-500" >
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/pacotes" icon={HiShoppingBag}>
                Pacotes
              </Sidebar.Item>

              <Sidebar.Item href="/passeios" icon={HiPaperAirplane}>
                Passeios
              </Sidebar.Item>

              <Sidebar.Item href="/users" icon={HiInbox} label="3">
                Users
              </Sidebar.Item>

              <Sidebar.Item icon={HiLogout}>
                <button onClick={logOut}>Logout</button>
              </Sidebar.Item>

            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>

        <div className='m-4'>
          <AppRoutes />
        </div>
      </div>
    );
}