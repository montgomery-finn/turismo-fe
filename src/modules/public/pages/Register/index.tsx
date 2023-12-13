import { useCallback, useEffect, useState } from "react";
import { Button, Datepicker, Label, Select, TextInput } from 'flowbite-react';
import SpringApi from "../../../shared/services/SpringApi";
import PessoaDTO from "../../../admin/DTOs/PessoaDTO";
import CenterContainer from "../../../shared/components/CenterContainer";
import { useToast } from "../../../shared/hooks/toast";

export default function Register() {

    const [name, setName] = useState('');
    const [birth, setBirth] = useState(new Date());
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { addToast } = useToast();

    const handleSubmit = useCallback(async () => {

        try{
            const response = await SpringApi.post<PessoaDTO>('/pessoa', {
                nome: name,
                email: email,
                nascimento: birth,
                password,
                tipo: 0
            });

            addToast({
                color: 'green',
                description: 'Já cadastrou'
            })
        }
        catch(e: any){
            addToast({
                color: 'red',
                description:JSON.stringify(e.response.data) 
            });
        }

    }, [name, email, birth, password]);

    return (
        <CenterContainer>

            <form className="flex max-w-md flex-col gap-4" action="#">
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
                
                <Button onClick={handleSubmit}>Submit</Button>
            </form>
        </CenterContainer>
    );
}
