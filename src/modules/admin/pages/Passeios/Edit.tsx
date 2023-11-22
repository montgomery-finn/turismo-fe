import { useCallback, useEffect, useState } from "react";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";
import PasseioDTO from "../../../shared/DTOs/PasseioDTO";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../shared/hooks/toast";

export default function EditPasseio() {

    const [description, setDescription] = useState('');
    const [itinerario, setItinerario] = useState('');

    const [price, setPrice] = useState<Number>(0);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        async function busca() {
            const response = await SpringApi.get<PasseioDTO>(`passeio/${id}`);

            setDescription(response.data.destino);
            setItinerario(response.data.itinerario);
            setPrice(response.data.preco);
        }

        busca();
    }, [id]);

    const { addToast } = useToast();

    const handleSubmit = useCallback(async () => {
       
        try{
            const response = await SpringApi.put(`passeio/${id}`, {
                destino: description,
                itinerario,
                preco: price
            })
    
            navigate('/admin/passeios');

            addToast({
                color: 'green',
                description: 'Já editou'
            })
        }
        catch(e: any){
            addToast({
                color: 'red',
                description:JSON.stringify(e.response.data) 
            });
        }
    }, [id, description, itinerario, price, navigate]);

    return (
        <div>
            <Title>Aqui edita o passeio</Title>

            <form action="#" className="space-y-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Descrição" />
                    </div>

                    <TextInput id="description" required  
                        value={description} onChange={(event) => setDescription(event.target.value) }/>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="itinerario" value="Itinerario" />
                    </div>

                    <Textarea id="itinerario" required  
                        value={itinerario} onChange={(event) => setItinerario(event.target.value) }/>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="price" value="Preço" />
                    </div>
                    
                    <TextInput id="price" type="number" required 
                        value={Number(price)} onChange={(event) => setPrice(Number(event.target.value)) }/>
                </div>

                <Button onClick={handleSubmit}>Salva</Button>
            </form>
        </div>
    )
}