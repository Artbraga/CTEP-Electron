export class Usuario{
    id: number;
    nome: string;
    login: string;
    senha: string;
    telefone: string;

    permissao: number;

    constructor(){
        this.id = null;
        this.nome = null;
        this.login = null;
        this.senha = null;
        this.telefone = null;
        this.permissao = null;
    }
}