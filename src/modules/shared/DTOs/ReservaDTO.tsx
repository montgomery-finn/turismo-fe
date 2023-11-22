
import Pacote from './Pacote'
import PessoaDTO from '../../admin/DTOs/PessoaDTO';

export default interface ReservaDTO {
    id: string;
    data: string;
    pacote: Pacote;
    person: PessoaDTO;
}


// {
//     "id": "9ed2c9bd-d255-422c-9337-25bccdb5e9cc",
//     "createdAt": "2023-09-20T15:14:39.784514",
//     "updatedAt": "2023-09-20T15:14:39.784514",
//     "data": "2023-09-30T14:30:00",
//     "pacote": {
//       "id": "7097bcc7-1fc3-4813-b70a-5cff770cff3a",
//       "createdAt": "2023-09-20T14:50:16.736086",
//       "updatedAt": "2023-11-13T21:59:47.468529",
//       "descricao": "Pacote de Praia",
//       "preco": 500.0,
//       "passeios": [
//         {
//           "id": "954a35ae-0c46-4061-8b1a-f1501930f0ae",
//           "createdAt": "2023-11-13T21:59:36.300964",
//           "updatedAt": "2023-11-13T21:59:36.300964",
//           "destino": "Passeio na praia",
//           "itinerario": "Vai tomar banho na prainha de Itaipulândia",
//           "preco": 5.0
//         }
//       ]
//     },
//     "person": null
//   }