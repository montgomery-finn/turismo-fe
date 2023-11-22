import { useCallback, useEffect, useState } from "react";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";
import PasseioDTO from "../../DTOs/PasseioDTO";
import { Button, Label, TextInput } from "flowbite-react";
import Select from 'react-select'
import SelectOption from "../../../shared/DTOs/SelectOption";
import { useToast } from "../../../shared/hooks/toast";
import { useNavigate } from "react-router-dom";

export default function Create() {

    const [passeios, setPasseios] = useState<SelectOption[]>([]);
    const [selectedPasseios, setSelectedPasseios] = useState<SelectOption[]>([]);

    useEffect(() => {
        setSelectedPasseios([]);
    }, [passeios]);

    const [description, setDescription] = useState('');

    const [price, setPrice] = useState<Number>(0);

    const buscaPasseios = useCallback(async () => {
        const response = await SpringApi.get<PasseioDTO[]>('passeio');

        setPasseios(response.data.map(passeio => ({
            label: passeio.destino, value: passeio.id
        })));
    }, []);

    useEffect(() => {
        buscaPasseios();
    }, [buscaPasseios]);

    const { addToast } = useToast();

    const navigate = useNavigate();

    const handleSubmit = useCallback(async () => {
        
        try{
            await SpringApi.post('pacote', {
                descricao: description,
                preco: price,
                passeiosIds: selectedPasseios.map(passeio => passeio.value)
            })

            addToast({
                color: 'green',
                description: 'Já cadastrou'
            })

            navigate('/pacotes');
        }
        catch(e: any){
            addToast({
                color: 'red',
                description:JSON.stringify(e.response.data) 
            });
        }

    }, [description, price, selectedPasseios]);

    return (
        <div>
            <Title>Aqui adiciona um novo pacote</Title>

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
                        <Label htmlFor="price" value="Preço" />
                    </div>
                    
                    <TextInput id="price" type="number" required 
                        value={Number(price)} onChange={(event) => setPrice(Number(event.target.value)) }/>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="price" value="Passeios" />
                    </div>
                    
                    <Select 
                        options={passeios} 
                        isMulti={true} 
                        value={selectedPasseios} 
                        onChange={(s) => setSelectedPasseios(s as SelectOption[])}
                        />
                </div>

                <Button onClick={handleSubmit}>Adiciona</Button>
            </form>
        </div>
    )
}