export class AlunoCursoLivre {
    public id: number = 0;
    public nome: string;
    public cpf: string;
    public rg: string;
    public orgaoEmissor: string;
    public endereco: string;
    public celular: string;

    get nomeAutocomplete(): string {
        return `${this.nome} - ${this.cpf}`;
    }
}