

import { Button, Card } from "flowbite-react";

import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";
import { HiTrash, HiPencil } from 'react-icons/hi';
import { useToast } from "../../../shared/hooks/toast";
import PessoaDTO from "../../DTOs/PessoaDTO";
import FlexWrapContainer from "../../../shared/components/FlexWrapContainer";


export default function Users () {

    const [pessoas, setPessoas] = useState<PessoaDTO[]>([]);

    const busca = useCallback(async () => {
        const respose = await SpringApi.get<PessoaDTO[]>('pessoa');
            
        setPessoas(respose.data)
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
                await SpringApi.delete(`pessoa/${id}`);
                
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
            <Title>Esses são os Pessoas</Title>

            <Button className="mb-4">
                <Link to="/admin/users/novo">
                    Aqui adiciona um novo
                </Link>
            </Button>

            <FlexWrapContainer>
                {pessoas.map(pessoa => (
                    <Card className="max-w-lg" key={pessoa.id}>
                        <div className="flex justify-between gap-4">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {pessoa.nome}
                            </h5>

                            <Button color="failure" onClick={() => handleDelete(pessoa.id)}>
                                <HiTrash />
                            </Button>

                            <Link to={`/admin/users/edit/${pessoa.id}`}>
                                <Button color="warning">
                                    <HiPencil />
                                </Button>
                            </Link>
                        </div>
                    
                        <ul>
                            <li>{pessoa.email}</li>
                            <li>{pessoa.nascimento.toString()}</li>
                        </ul>
                    </Card>     
                ))}
            </FlexWrapContainer>
        </div>
    )

}