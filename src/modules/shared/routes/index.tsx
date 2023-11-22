import Admin from "../../admin";
import Client from "../../client";
import Public from "../../public/pages";
import { useAuth } from "../hooks/Auth";

export default function SharedRoutes () {

    const { user } = useAuth();

    if(!user) return <Public />;

    if(user.tipo == 'cliente') return <Client />

    return <Admin />; 
}