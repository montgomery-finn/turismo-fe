

import { Button, Card } from "flowbite-react";

import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";
import PasseioDTO from "../../../shared/DTOs/PasseioDTO";
import { HiTrash, HiPencil } from 'react-icons/hi';
import { useToast } from "../../../shared/hooks/toast";
import FlexWrapContainer from "../../../shared/components/FlexWrapContainer";


export default function Passeios () {

    const [passeios, setPasseios] = useState<PasseioDTO[]>([]);

    const busca = useCallback(async () => {
        const respose = await SpringApi.get<PasseioDTO[]>('passeio');
            
        setPasseios(respose.data)
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
                await SpringApi.delete(`passeio/${id}`);
                
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
            <Title>Esses são os Passeios</Title>

            <Button className="mb-4">
                <Link to="/passeios/novo">
                    Aqui adiciona um novo
                </Link>
            </Button>

            <FlexWrapContainer>
                {passeios.map(passeio => (
                    <Card className="max-w-lg" key={passeio.id}>
                        <div className="flex justify-between gap-4">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {passeio.destino}
                            </h5>

                            <Button color="failure" onClick={() => handleDelete(passeio.id)}>
                                <HiTrash />
                            </Button>

                            <Link to={`/passeios/edit/${passeio.id}`}>
                                <Button color="warning">
                                    <HiPencil />
                                </Button>
                            </Link>
                        </div>
                    
                        <p>{passeio.itinerario}</p>
                    </Card>     
                ))}
            </FlexWrapContainer>
        </div>
    )

}