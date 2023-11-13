

import { Button, Card, ListGroup, Table } from "flowbite-react";

import React, { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Pacote from "../../../shared/DTOs/Pacote";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";

export default function Pacotes () {

    const [pacotes, setPacotes] = useState<Pacote[]>([]);

    useEffect(() => {
        async function busca() {
            const respose = await SpringApi.get<Pacote[]>('pacote');
            
            setPacotes(respose.data)

        }
        busca();        
    }, []);


    return (
        <div>
            <Title>Esses são os pacotes</Title>

            <Button className="mb-4">
                <Link to="/pacotes/novo">
                    Aqui adiciona um novo
                </Link>
            </Button>

            {pacotes.map(pacote => (
                <Card className="max-w-lg" key={pacote.id}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {pacote.descricao}
                    </h5>
                
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Passeio</Table.HeadCell>
                            <Table.HeadCell>Itinerário</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {pacote.passeios.map(passeio => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
              </Card>     
            ))}
        </div>
    )

}