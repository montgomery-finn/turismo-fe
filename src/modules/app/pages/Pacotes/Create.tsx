import { useCallback, useEffect } from "react";
import SpringApi from "../../../shared/services/SpringApi";
import Title from "../../../shared/components/Title";

export default function Create() {

    const buscaPasseios = useCallback(async () => {
        const response = await SpringApi.get('passeio');
    }, []);

    useEffect(() => {
        buscaPasseios();
    }, [buscaPasseios]);


    return <Title>Aqui adiciona um novo pacote</Title>
}