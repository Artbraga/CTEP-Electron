import { Perfil } from "./perfil.model";

export class Usuario {
    id: number;
    escolaId: number;
    nome: string;
    login: string;
    senha: string;
    telefone: string;
    email: string;
    perfil: Perfil;
    tipo: string;

    alunoId: number;
    professorId: number;

    constructor() {
        this.id = null;
        this.nome = null;
        this.login = null;
        this.senha = null;
        this.telefone = null;
    }
}
