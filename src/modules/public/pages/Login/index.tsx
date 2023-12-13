import { useCallback, useState } from "react";
import { Button, Label, TextInput } from 'flowbite-react';
import CenterContainer from "../../../shared/components/CenterContainer";
import { useAuth } from "../../../shared/hooks/Auth";
import { useToast } from "../../../shared/hooks/toast";

export default function Component() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { addToast } = useToast();

    const { logIn } = useAuth();

    const handleSubmit = useCallback(async () => {

        try{
           await logIn({email, password});
            
            addToast({
                color: 'green',
                description: 'Já logou' 
            });
        }
        catch(e: any){
            addToast({
                color: 'red',
                description:JSON.stringify(e.response.data) 
            });
        }

    }, [email, password, addToast]);

    return (
        <CenterContainer>

            <form className="flex max-w-md flex-col gap-4" action="#">
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
                
                <Button onClick={handleSubmit}>Submit</Button>
            </form>
        </CenterContainer>
    );
}
