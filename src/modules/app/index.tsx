import { Sidebar } from "flowbite-react";
import { HiOutlineUserAdd, HiInbox, HiShoppingBag, HiLogin } from 'react-icons/hi';
import MyRoutes from "../auth/routes";


export default function App() {
    return (
        <div className='flex'>
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/register"  icon={HiOutlineUserAdd}>
                Cadastrar
              </Sidebar.Item>

              <Sidebar.Item href="/login" icon={HiLogin}>
                Login
              </Sidebar.Item>
              
              <Sidebar.Item href="/pacotes" icon={HiShoppingBag}>
                Pacotes
              </Sidebar.Item>

              <Sidebar.Item href="/users" icon={HiInbox} label="3">
                Users
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>

        <div className='m-4'>
          <MyRoutes />
        </div>
      </div>
    );
}