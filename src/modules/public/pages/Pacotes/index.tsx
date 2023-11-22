import { useCallback, useEffect, useState } from "react";
import Pacote from "../../../admin/DTOs/Pacote";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";
import { Button, Card, Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Home() {

    const [pacotes, setPacotes] = useState<Pacote[]>([]);

    const busca = useCallback(async () => {
        const respose = await SpringApi.get<Pacote[]>('pacote');
            
        setPacotes(respose.data)
    }, []);

    useEffect(() => {
        busca();        
    }, [busca]);

    return (
        <div>
            <div className="flex gap-4">
                {pacotes.map(pacote => (
                    <Card key={pacote.id}>   
                        <div className="flex flex-col items-stretch h-full">

                            <div className="flex justify-between gap-4">
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {pacote.descricao}
                                </h5>
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
    );
}