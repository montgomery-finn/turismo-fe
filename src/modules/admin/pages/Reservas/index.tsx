

import { Button, Card } from "flowbite-react";

import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";
import ReservaDTO from "../../../shared/DTOs/ReservaDTO";
import { HiTrash, HiPencil } from 'react-icons/hi';
import { useToast } from "../../../shared/hooks/toast";
import FlexWrapContainer from "../../../shared/components/FlexWrapContainer";
import { format } from 'date-fns';


export default function Reservas () {

    const [reservas, setReservas] = useState<ReservaDTO[]>([]);

    const busca = useCallback(async () => {
        const respose = await SpringApi.get<ReservaDTO[]>('reserva');
            
        setReservas(respose.data)
    }, []);

    useEffect(() => {
        busca();        
    }, [busca]);

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

                await busca();
            } catch(e: any){
                addToast({
                    color: 'red',
                    description:JSON.stringify(e.response.data) 
                });
            }
        }
        
    }, []);

    return (
        <div>
            <Title>Essas são as Reservas</Title>

            <Button className="mb-4">
                <Link to="/admin/reservas/novo">
                    Aqui adiciona uma nova
                </Link>
            </Button>

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

                            <Link to={`/admin/reservas/edit/${reserva.id}`}>
                                <Button color="warning">
                                    <HiPencil />
                                </Button>
                            </Link>
                        </div>
                    
                        <p>{reserva.pacote.descricao}</p>
                        <p>{reserva.person.nome}</p>
                    </Card>     
                ))}
            </FlexWrapContainer>
        </div>
    )

}