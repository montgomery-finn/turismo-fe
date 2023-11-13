import MyApp from "../../app";
import AppRoutes from "../../app/routes";
import AuthRoutes from "../../auth/routes";
import { useAuth } from "../hooks/Auth";

export default function SharedRoutes () {

    const { user } = useAuth();

    return user ? <MyApp /> : <AuthRoutes />
}