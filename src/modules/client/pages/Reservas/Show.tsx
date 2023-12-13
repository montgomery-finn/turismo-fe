import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import SpringApi from "../../../shared/services/SpringApi";
import ReservaDTO from "../../../shared/DTOs/ReservaDTO";
import { format } from "date-fns";
import Title from "../../../shared/components/Title";
import { Button, Card, Label, Radio, Textarea } from "flowbite-react";
import NodeApi from "../../../shared/services/NodeApi";
import { Evaluation } from "../../../shared/DTOs/Evaluation";
import { useAuth } from "../../../shared/hooks/Auth";
import { useToast } from "../../../shared/hooks/toast";

export default function ShowReserva() {
    
    const { reservaId } = useParams();
    
    const [reserva, setReserva] = useState<ReservaDTO>();

    const buscaReserva = useCallback(async (reservaId: string) => {
        const response = await SpringApi.get<ReservaDTO>(`reserva/${reservaId}`)
        setReserva(response.data);
    }, [])

    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

    const buscaAvaliacoes = useCallback(async (pacoteId: string) => {
            const response = await NodeApi.get<Evaluation[]>(`evaluations/pacoteId/${pacoteId}`)

            setEvaluations(response.data);
    }, [])

    useEffect(() => {
        if(reserva){
            buscaAvaliacoes(reserva.pacote.id as string);
        }
    }, [reserva]);

    useEffect(() => {
        buscaReserva(reservaId as string)
    }, [reserva])

    const [score, setScore] = useState<Number>(5);

    const [comment, setComment] = useState('');

    const { user } = useAuth();

    const { addToast } = useToast();

    const handleSubmit = useCallback(async () => {
        if(reserva && score){
            const response = await NodeApi.post('evaluations', {
                personId: user.id,
                personName: user.nome,
                pacoteId: reserva.pacote.id,
                score,
                comment
            });
    
            addToast({
                color: 'green',
                description: 'Já comentou'
            });

            buscaAvaliacoes(reserva.pacote.id);
        }
    }, [score, comment, user, reserva]);

    return (
        <div>
            <Title>Detalhes da reserva</Title>
            {reserva && (
                <>
                    <p><strong>Quem comprou será?</strong> {reserva.person.nome}</p>
                    <p><strong>Qual pacote será?</strong> {reserva.pacote.descricao}</p>
                    <p><strong>Que dia vai ir será?</strong> {format(new Date(reserva.data), "dd/MM/yyyy") }</p>
                </>
            )}
            
            <h2 className="mt-4 mb-4 font-bold">Comentários</h2>
            
            <form action="#" className="space-y-4">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <Radio id="um" name="score" value="1" onClick={() => setScore(1)} required />
                        <Label htmlFor="um">1</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio id="dois" name="score" value="2" onClick={() => setScore(2)} required />
                        <Label htmlFor="dois">2</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio id="tres" name="score" value="3" onClick={() => setScore(3)} required />
                        <Label htmlFor="tres">3</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio id="quatro" name="score" value="4" onClick={() => setScore(4)} required />
                        <Label htmlFor="quatro">4</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio id="cinco" name="score" value="5" onClick={() => setScore(5)} required />
                        <Label htmlFor="cinco">5</Label>
                    </div>
                </div>

                <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />

                <Button onClick={handleSubmit}>Comenta</Button>
            </form>

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
        </div>
    )
}