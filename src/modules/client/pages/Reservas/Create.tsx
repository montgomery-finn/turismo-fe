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
import { useAuth } from "../../../shared/hooks/Auth";

export default function CreateReserva() {

    const [date, setDate] = useState(new Date());
    
    const { pacoteId } = useParams();

    const [pacote, setPacote] = useState<Pacote>();

    const buscaPacote = useCallback(async (id: any) => {
        const response = await SpringApi.get<Pacote>(`pacote/${id}`);

        setPacote(response.data);
    }, []);

    useEffect(() => {
        buscaPacote(pacoteId);
    }, [buscaPacote, pacoteId]);

    const { user } = useAuth();

    const { addToast } = useToast();

    const navigate = useNavigate();

    const handleSubmit = useCallback(async () => {
        
        try{
            await SpringApi.post('reserva', {
                data: date,
                pacote: {
                    id: pacoteId
                },
                person: {
                    id: user.id
                }
            })

            addToast({
                color: 'green',
                description: 'Já cadastrou'
            })

            navigate('/client/reservas');
        }
        catch(e: any){
            addToast({
                color: 'red',
                description:JSON.stringify(e.response.data) 
            });
        }

    }, [date, user, pacote]);

    return (
        <div>
            <Title>Aqui adiciona uma nova reserva</Title>

            <form action="#" className="space-y-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="pacote" value="Pacote" />
                    </div>
                    
                    <Datepicker id="pacote" value={pacote?.descricao} />
                </div>


                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="date" value="Data" />
                    </div>
                    
                    <Datepicker id="date" value={date?.toString()} onSelectedDateChanged={(e) => setDate(e)} />
                </div>

                <Button onClick={handleSubmit}>Adiciona</Button>
            </form>
        </div>
    )
}