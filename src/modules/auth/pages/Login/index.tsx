import { useCallback, useState } from "react";
import { Button, Label, TextInput } from 'flowbite-react';
import CenterContainer from "../../../shared/components/CenterContainer";
import { useAuth } from "../../../shared/hooks/Auth";

export default function Component() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const {logIn} = useAuth();

    const handleSubmit = useCallback(async () => {
        setError('');
        setSuccess('');

        try{
           await logIn({email, password});
        }
        catch(e: any){
            setError(JSON.stringify(e.response.data));
        }

    }, [email, password]);

    return (
        <CenterContainer>

            <form className="flex max-w-md flex-col gap-4" action="#" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email" />
                    </div>

                    <TextInput id="email" type="email" placeholder="name@flowbite.com" required  
                        value={email} onChange={(event) => setEmail(event.target.value) }/>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password" />
                    </div>
                    
                    <TextInput id="password" type="password" required 
                        value={password} onChange={(event) => setPassword(event.target.value) }/>
                </div>
                
                <Button type="submit">Submit</Button>

                <p className="text-red-500">{error}</p>
                <p className="text-green-500">{success}</p>
            </form>
        </CenterContainer>
    );
}
