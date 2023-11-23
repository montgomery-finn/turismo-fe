import { useCallback, useEffect, useState } from "react";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";
import { Button, Datepicker, Label } from "flowbite-react";
import Select from 'react-select'
import SelectOption from "../../../shared/DTOs/SelectOption";
import { useToast } from "../../../shared/hooks/toast";
import { useNavigate, useParams } from "react-router-dom";
import Pacote from "../../../shared/DTOs/Pacote";
import ReservaDTO from "../../../shared/DTOs/ReservaDTO";
import { useAuth } from "../../../shared/hooks/Auth";

export default function EditReserva() {

    const [date, setDate] = useState(new Date());
  
    const [pacotes, setPacotes] = useState<SelectOption[]>([]);
    const [selectedPacote, setSelectedPacote] = useState<SelectOption>();

    

    const buscaPacotes = useCallback(async () => {
        const response = await SpringApi.get<Pacote[]>('pacote');

        setPacotes(response.data.map(pacote => ({
            label: pacote.descricao, value: pacote.id
        })));
    }, []);

    const buscaReserva = useCallback(async (reservaId: string) => {
        const response = await SpringApi.get<ReservaDTO>(`reserva/${reservaId}`)

        setDate(new Date(response.data.data));
        
        setSelectedPacote({
            label: response.data.pacote.descricao,
            value: response.data.pacote.id
        });

    }, [])

    const { reservaId } = useParams();

    useEffect(() => {
        buscaReserva(reservaId as string)
    }, [reservaId])

    useEffect(() => {
        buscaPacotes();
    }, [buscaPacotes]);

    const { addToast } = useToast();

    const navigate = useNavigate();

    const { user } = useAuth();

    const handleSubmit = useCallback(async () => {
        
        try{
            await SpringApi.put(`reserva/${reservaId}`, {
                id: reservaId,
                data: date,
                pacote: {
                    id: selectedPacote?.value
                },
                person: {
                    id: user.id
                }
            })

            addToast({
                color: 'green',
                description: 'Já atualizou'
            })

            navigate('/client/reservas');
        }
        catch(e: any){
            addToast({
                color: 'red',
                description:JSON.stringify(e.response.data) 
            });
        }

    }, [reservaId, date, selectedPacote, user]);

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