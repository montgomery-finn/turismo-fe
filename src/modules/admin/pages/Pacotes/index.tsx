

import { Button, Card, Table } from "flowbite-react";

import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Pacote from "../../DTOs/Pacote";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";
import { HiTrash, HiPencil } from 'react-icons/hi';
import { useToast } from "../../../shared/hooks/toast";


export default function Pacotes () {

    const [pacotes, setPacotes] = useState<Pacote[]>([]);

    const busca = useCallback(async () => {
        const respose = await SpringApi.get<Pacote[]>('pacote');
            
        setPacotes(respose.data)
    }, []);

    useEffect(() => {
        busca();        
    }, [busca]);

    const { addToast } = useToast();

    const handleDelete = useCallback(async (id: String) => {
        const confirmed = window.confirm("Vai excluir mesmo?");

        if(confirmed)
        {
            try {
                await SpringApi.delete(`pacote/${id}`);
                
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
            <Title>Esses são os pacotes</Title>

            <Button className="mb-4">
                <Link to="/pacotes/novo">
                    Aqui adiciona um novo
                </Link>
            </Button>

            <div className="flex gap-4">
                {pacotes.map(pacote => (
                    <Card key={pacote.id}>   
                        <div className="flex flex-col items-stretch h-full">

                            <div className="flex justify-between gap-4">
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {pacote.descricao}
                                </h5>

                                <div className="flex gap-4">
                                    <Button color="failure" onClick={() => handleDelete(pacote.id)}>
                                        <HiTrash />
                                    </Button>

                                    <Link to={`/pacotes/edit/${pacote.id}`}>
                                        <Button color="warning">
                                            <HiPencil />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <p>Preço: {pacote.preco}</p>

                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>Passeio</Table.HeadCell>
                                    <Table.HeadCell>Itinerário</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {pacote.passeios.map(passeio => (
                                        <Table.Row key={passeio.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {passeio.destino}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {passeio.itinerario}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                    </Card>     
                ))}
            </div>
        </div>
    )

}