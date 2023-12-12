import { useCallback, useEffect, useState } from "react";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";
import PasseioDTO from "../../../shared/DTOs/PasseioDTO";
import { Button, Datepicker, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useToast } from "../../../shared/hooks/toast";
import { useNavigate, useParams } from "react-router-dom";
import PessoaDTO from "../../DTOs/PessoaDTO";

export default function EditUser() {

    const { id } = useParams();

    const [name, setName] = useState('');
    const [birth, setBirth] = useState(new Date());
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState<Number>(0);

    const busca = useCallback(async (userId: string) => {
        const response = await SpringApi.get<PessoaDTO>(`pessoa/${userId}`);

        setName(response.data.nome);
        setBirth(response.data.nascimento);
        setEmail(response.data.email);
        setType(response.data.tipo == 'cliente' ? 0 : 1);

        console.log('ja buscou')
    }, [id]);

    useEffect(() => {
        busca(id as string);
    }, [id])

    const { addToast } = useToast();

    const navigate = useNavigate();

    const handleSubmit = useCallback(async () => {
        try{
            const response = await SpringApi.post<PessoaDTO>('/pessoa', {
                nome: name,
                email: email,
                nascimento: birth,
                password
            });

            addToast({
                color: 'green',
                description: 'Já cadastrou'
            })

            navigate('/admin/users');
            
        } catch(e: any){
            addToast({
                color: 'red',
                description:JSON.stringify(e.response.data) 
            });
        }
        
    }, [addToast, name, email, birth, password]);

    return (
        <div>
            <Title>Aqui edita o usuário</Title>

            <form action="#" className="space-y-4">
            <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Nome" />
                    </div>

                    <TextInput id="name" placeholder="Synntiah" required  
                        value={name} onChange={(event) => setName(event.target.value) }/>
                </div>
                
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email" />
                    </div>

                    <TextInput id="email" type="email" placeholder="name@flowbite.com" required  
                        value={email} onChange={(event) => setEmail(event.target.value) }/>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="birth" value="Aniversário" />
                    </div>
                    
                    <Datepicker id="birth" value={birth?.toString()} onSelectedDateChanged={(e) => setBirth(e)} />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="type" value="Tipo" />
                    </div>
                    
                    <Select id="type" required onChange={e => setType(Number(e.target.value))}>
                        <option value={0} selected={type == 0}>Cliente</option>
                        <option value={1} selected={type == 1}> Agência</option>
                    </Select>
                </div>

                <Button onClick={handleSubmit}>Adiciona</Button>
            </form>
        </div>
    )
}