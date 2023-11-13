import PasseioDTO from "./PasseioDTO";

export default interface Pacote {
    id: string;
    createdAt: Date;
    updatedAt:Date;
    descricao: string;
    passeios: PasseioDTO[]; 
}