import { useCallback, useEffect, useState } from "react";
import { Button, Datepicker, Label, TextInput } from 'flowbite-react';
import SpringApi from "../../../shared/services/SpringApi";
import PessoaDTO from "../../../app/DTOs/PessoaDTO";
import CenterContainer from "../../../shared/components/CenterContainer";

export default function Register() {

    const [name, setName] = useState('');
    const [birth, setBirth] = useState(new Date());
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const handleSubmit = useCallback(async () => {
        setError('');
        setSuccess('');

        try{
            const response = await SpringApi.post<PessoaDTO>('/pessoa', {
                nome: name,
                email: email,
                nascimento: birth,
                password
            });

            setSuccess(`Já cadastrou ${response.data.nome}`);
            // SpringApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        catch(e: any){
            setError(JSON.stringify(e.response.data));
            
        }

    }, [name, email, birth, password]);

    return (
        <CenterContainer>

            <form className="flex max-w-md flex-col gap-4" action="#" onSubmit={handleSubmit}>
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

                
                
                <Button type="submit">Submit</Button>

                <p className="text-red-500">{error}</p>
                <p className="text-green-500">{success}</p>
            </form>
        </CenterContainer>
    );
}
