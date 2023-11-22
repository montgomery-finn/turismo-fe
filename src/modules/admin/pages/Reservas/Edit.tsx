import { useCallback, useEffect, useState } from "react";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";
import PasseioDTO from "../../../shared/DTOs/PasseioDTO";
import { Button, Datepicker, Label, TextInput } from "flowbite-react";
import Select from 'react-select'
import SelectOption from "../../../shared/DTOs/SelectOption";
import { useToast } from "../../../shared/hooks/toast";
import { useNavigate, useParams } from "react-router-dom";
import PessoaDTO from "../../DTOs/PessoaDTO";
import Pacote from "../../../shared/DTOs/Pacote";
import ReservaDTO from "../../../shared/DTOs/ReservaDTO";

export default function EditReserva() {

    const [date, setDate] = useState(new Date());
  
    const [pacotes, setPacotes] = useState<SelectOption[]>([]);
    const [selectedPacote, setSelectedPacote] = useState<SelectOption>();

    const [pessoas, setPessoas] = useState<SelectOption[]>([]);
    const [selectedPessoa, setSelectedPessoa] = useState<SelectOption>();

    const buscaPessoas = useCallback(async () => {
        const response = await SpringApi.get<PessoaDTO[]>('pessoa');

        setPessoas(response.data.map(pessoa => ({
            label: pessoa.nome, value: pessoa.id
        })));
    }, []);

    const buscaPacotes = useCallback(async () => {
        const response = await SpringApi.get<Pacote[]>('pacote');

        setPacotes(response.data.map(pacote => ({
            label: pacote.descricao, value: pacote.id
        })));
    }, []);

    const { id } = useParams();

    const buscaReserva = useCallback(async (reservaId: string) => {
        const response = await SpringApi.get<ReservaDTO>(`reserva/${reservaId}`)

        setDate(new Date(response.data.data));
        
        setSelectedPacote({
            label: response.data.pacote.descricao,
            value: response.data.pacote.id
        });
        setSelectedPessoa({
            label: response.data.person.nome,
            value: response.data.person.id
        });

    }, [])

    useEffect(() => {
        buscaReserva(id as string)
    }, [id])

    useEffect(() => {
        buscaPessoas();
        buscaPacotes();
    }, [buscaPessoas, buscaPacotes]);

    const { addToast } = useToast();

    const navigate = useNavigate();

    const handleSubmit = useCallback(async () => {
        
        try{
            await SpringApi.put(`reserva/${id}`, {
                id: id,
                data: date,
                pacote: {
                    id: selectedPacote?.value
                },
                person: {
                    id: selectedPessoa?.value
                }
            })

            addToast({
                color: 'green',
                description: 'Já atualizou'
            })

            navigate('/admin/reservas');
        }
        catch(e: any){
            addToast({
                color: 'red',
                description:JSON.stringify(e.response.data) 
            });
        }

    }, [id, date, selectedPacote, selectedPessoa]);

    return (
        <div>
            <Title>Aqui edita a reserva</Title>

            <form action="#" className="space-y-4">

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="date" value="Data" />
                    </div>
                    
                    <Datepicker id="date" value={date?.toString()} onSelectedDateChanged={(e) => setDate(e)} />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="pessoa" value="Pessoa" />
                    </div>
                    
                    <Select 
                        id="pessoa"
                        options={pessoas} 
                        isMulti={false} 
                        value={selectedPessoa} 
                        onChange={(s) => setSelectedPessoa(s as SelectOption)}
                        />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="pacote" value="Pacote" />
                    </div>
                    
                    <Select 
                        id="pacote"
                        options={pacotes} 
                        isMulti={false} 
                        value={selectedPacote} 
                        onChange={(s) => setSelectedPacote(s as SelectOption)}
                        />
                </div>

                <Button onClick={handleSubmit}>Edita</Button>
            </form>
        </div>
    )
}