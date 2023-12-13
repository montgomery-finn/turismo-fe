import { useCallback, useEffect, useState } from "react";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";
import PasseioDTO from "../../../shared/DTOs/PasseioDTO";
import { Button, Datepicker, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useToast } from "../../../shared/hooks/toast";
import { useNavigate } from "react-router-dom";
import PessoaDTO from "../../DTOs/PessoaDTO";

export default function CreateUser() {

    const [name, setName] = useState('');
    const [birth, setBirth] = useState(new Date());
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState<Number>(0);


    const { addToast } = useToast();

    const navigate = useNavigate();

    const handleSubmit = useCallback(async () => {
        try{
            const response = await SpringApi.post<PessoaDTO>('/pessoa', {
                nome: name,
                email: email,
                nascimento: birth,
                password,
                tipo: type
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
        
    }, [addToast, name, email, birth, password, type]);

    return (
        <div>
            <Title>Aqui adiciona um novo usuário</Title>

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
                        <Label htmlFor="password" value="Senha" />
                    </div>
                    
                    <TextInput id="password" type="password" required 
                        value={password} onChange={(event) => setPassword(event.target.value) }/>
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
                        <option value={0} >Cliente</option>
                        <option value={1}>Agência</option>
                    </Select>
                </div>

                <Button onClick={handleSubmit}>Adiciona</Button>
            </form>
        </div>
    )
}