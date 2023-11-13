import PasseioDTO from "./PasseioDTO";

export default interface Pacote {
    id: string;
    createdAt: Date;
    updatedAt:Date;
    descricao: string;
    passeios: PasseioDTO[]; 
}


// id": "7097bcc7-1fc3-4813-b70a-5cff770cff3a",
//     "createdAt": "2023-09-20T14:50:16.736086",
//     "updatedAt": "2023-09-20T14:50:16.736086",
//     "descricao": "Pacote de Praia",
//     "preco": 500.0,
//     "passeios": [
//       {
//         "id": "9ec90033-acc8-4ea1-ad5e-1cf57c1f74ad",
//         "createdAt": "2023-09-20T14:49:55.059347",
//         "updatedAt": "2023-09-20T14:49:55.059347",
//         "destino": "Praia de Copacabana",
//         "itinerario": "Passeio à beira-mar",
//         "preco": 50.0
//       }
//     ]