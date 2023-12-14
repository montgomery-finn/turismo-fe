

import { Button, Card } from "flowbite-react";

import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";
import ReservaDTO from "../../../shared/DTOs/ReservaDTO";
import { HiTrash, HiPencil } from 'react-icons/hi';
import { useToast } from "../../../shared/hooks/toast";
import { useAuth } from "../../../shared/hooks/Auth";
import FlexWrapContainer from "../../../shared/components/FlexWrapContainer";
import { format } from "date-fns";


export default function Reservas () {

    const [reservas, setReservas] = useState<ReservaDTO[]>([]);

    const { user } = useAuth();

    const busca = useCallback(async (userId: string) => {
        const respose = await SpringApi.get<ReservaDTO[]>(`reserva/getByUser/${userId}`);
            
        setReservas(respose.data)

        console.log('esse é o userId => ', userId);
        console.log('essas são as reservas => ', respose.data);
    }, []);

    useEffect(() => {
        busca(user.id as string);        
    }, [busca, user]);

    const { addToast} = useToast();

    const handleDelete = useCallback(async (id: String) => {
        const confirmed = window.confirm("Vai excluir mesmo?");

        if(confirmed)
        {
            try {
                await SpringApi.delete(`reserva/${id}`);
                
                addToast({
                    color: 'green',
                    description: 'Já excluiu'
                })

                await busca(user.id);
            } catch(e: any){
                addToast({
                    color: 'red',
                    description:JSON.stringify(e.response.data) 
                });
            }
        }
        
    }, [user]);

    return (
        <div>
            <Title>Essas são as Reservas</Title>

            <FlexWrapContainer>
                {reservas.map(reserva => (
                    <Card className="max-w-lg" key={reserva.id}>
                        <div className="flex justify-between gap-4">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {format(new Date(reserva.data), "dd/MM/yyyy")}
                            </h5>

                            <Button color="failure" onClick={() => handleDelete(reserva.id)}>
                                <HiTrash />
                            </Button>

                            <Link to={`/client/reservas/edit/${reserva.id}`}>
                                <Button color="warning">
                                    <HiPencil />
                                </Button>
                            </Link>
                        </div>
                    
                        <p>{reserva.pacote.descricao}</p>
                        <p>{reserva.person.nome}</p>

                        <Button href={`/client/reservas/show/${reserva.id}`}>Ver detalhes</Button>
                    </Card>     
                ))}
            </FlexWrapContainer>
        </div>
    )

}