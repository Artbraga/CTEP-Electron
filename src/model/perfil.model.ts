import { Usuario } from './usuario.model';

export class Perfil {
    nome: string;
    usuarios: Usuario[];
    permissoes: string[];
}
