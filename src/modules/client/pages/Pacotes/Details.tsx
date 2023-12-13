import { Link, useParams } from "react-router-dom";
import Title from "../../../shared/components/Title";
import { useCallback, useEffect, useState } from "react";
import Pacote from "../../../shared/DTOs/Pacote";
import SpringApi from "../../../shared/services/SpringApi";
import { Button, Card, Table } from "flowbite-react";
import { HiBookmark } from 'react-icons/hi';
import { Evaluation } from "../../../shared/DTOs/Evaluation";
import NodeApi from "../../../shared/services/NodeApi";
import { format } from "date-fns";


export default function Details () {

    const { id } = useParams();

    const [pacote, setPacote] = useState<Pacote>();

    const buscaPacote = useCallback(async (pacoteId: string) => {
        const response = await SpringApi.get<Pacote>(`pacote/${pacoteId}`);
        setPacote(response.data)
    }, []);

    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

    const buscaAvaliacoes = useCallback(async (reservaId: string) => {
        const response = await NodeApi.get<Evaluation[]>(`evaluations/pacoteId/${reservaId}`)

        setEvaluations(response.data);
    }, [])

    useEffect(() => {
        buscaPacote(id as string);
        buscaAvaliacoes(id as string);
    }, [id]);
    
    return (
        <div>
            <Title>Os detalhes do pacote</Title>

            {pacote && 
                <>
                    <div className="flex justify-between gap-4">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {pacote.descricao}
                        </h5>

                        <div className="flex gap-4">
                            <Link to={`/client/reservas/novo/${pacote.id}`}>
                                <Button color="success">
                                    <HiBookmark />
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

                    <h3 className="mt-4">Comentários</h3>

                    <div>
                        {evaluations.map(evaluation => (
                            <Card key={evaluation._id}>
                                <h5>{evaluation.personName} em {format(new Date(evaluation.createdAt), "dd/MM/yyyy")}</h5>
                                <div>
                                    <strong>Nota: </strong>{evaluation.score.toString()}
                                </div>
                                <p>{evaluation.comment}</p>
                            </Card>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}