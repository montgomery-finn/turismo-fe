import { Button } from "flowbite-react";
import CenterContainer from "../../shared/components/CenterContainer";

export default function Auth() {
    return (
        <CenterContainer className="gap-4">
            <Button href="/login">Aqui faz login</Button>
            <Button href="/register">Aqui cadastra</Button>
        </CenterContainer>
    );
}