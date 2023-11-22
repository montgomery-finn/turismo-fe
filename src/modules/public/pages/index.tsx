import Navbar from "../../shared/components/Navbar";
import PublicRoutes from "../routes";

export default function Public() {
    return (
        <div>
            <Navbar 
                homeHref="/" 
                links={[
                    {name: 'Aqui faz login', href:'/login'},
                    {name: 'Aqui cadastra', href:'/register'}
                ]}
                />

                <PublicRoutes />
         </div>
    )
}