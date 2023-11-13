import { Route, Routes } from "react-router-dom";
import Pacotes from "../pages/Pacotes";
import Create from "../pages/Pacotes/Create";
import { Sidebar } from "flowbite-react";
import { HiOutlineUserAdd, HiInbox, HiShoppingBag, HiLogin } from 'react-icons/hi';

export default function AppRoutes() {
    return (
        <div>
            <Sidebar aria-label="Default sidebar example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/pacotes" icon={HiShoppingBag}>
                            Pacotes
                        </Sidebar.Item>

                        <Sidebar.Item href="/users" icon={HiInbox}>
                            Users
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

            <Routes>
                <Route path="/pacotes" element={<Pacotes />} />
                <Route path="/pacotes/novo" element={<Create />} />
            </Routes>
        </div>
    )
}