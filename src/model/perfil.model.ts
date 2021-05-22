import { Usuario } from './usuario.model';

export class Perfil {
    id: number;
    nome: string;
    usuarios: Usuario[];
    permissoes: string[];
}
