import { useCallback, useEffect, useState } from "react";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";
import PasseioDTO from "../../DTOs/PasseioDTO";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useToast } from "../../../shared/hooks/toast";
import { useNavigate } from "react-router-dom";

export default function Create() {

    const [description, setDescription] = useState('');
    const [itinerario, setItinerario] = useState('');

    const [price, setPrice] = useState<Number>(0);

    const { addToast } = useToast();

    const navigate = useNavigate();

    const handleSubmit = useCallback(async () => {
        try{
            await SpringApi.post('passeio', {
                destino: description,
                itinerario,
                preco: price
            });
    
            addToast({
                color: 'green',
                description: 'Já cadastrou'
            })

            navigate('/passeios');
            
        } catch(e: any){
            addToast({
                color: 'red',
                description:JSON.stringify(e.response.data) 
            });
        }
        
    }, [description, itinerario, price, addToast]);

    return (
        <div>
            <Title>Aqui adiciona um novo passeio</Title>

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


                <Button onClick={handleSubmit}>Adiciona</Button>
            </form>
        </div>
    )
}