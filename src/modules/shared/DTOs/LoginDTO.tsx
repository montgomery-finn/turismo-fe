export default interface LoginDTO {
    token: string,
    issuedIn: Date,
    expiresIn: Date,
    user: {
        id: string,
        nome: string,
        email: string
    }
}