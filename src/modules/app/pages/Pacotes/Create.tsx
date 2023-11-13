import { useCallback, useEffect, useState } from "react";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";
import PasseioDTO from "../../DTOs/PasseioDTO";
import { Button, Label, Select, TextInput } from "flowbite-react";

export default function Create() {

    const [passeios, setPasseios] = useState<PasseioDTO[]>([]);

    const [description, setDescription] = useState('');

    const [price, setPrice] = useState<Number>(0);

    const buscaPasseios = useCallback(async () => {
        const response = await SpringApi.get<PasseioDTO[]>('passeio');

        setPasseios(response.data);
    }, []);

    useEffect(() => {
        buscaPasseios();
    }, [buscaPasseios]);

    const handleSubmit = useCallback(() => {
        SpringApi.post('pacotte', {
            descricao: description,
            preco: price,
            passeiosIds: []
        })
    }, []);

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
                    
                    <select multiple  >
                        {passeios.map(passeio => (
                            <option key={passeio.id} value={passeio.id}>{passeio.destino}</option>
                        ))}
                    </select>
                </div>

                <Button>Adiciona</Button>
            </form>
        </div>
    )
}