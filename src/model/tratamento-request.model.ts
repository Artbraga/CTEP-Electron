export class TratamentoRequest<T> {
    possuiErro: boolean;
    mensagem: string;
    objetoTratado: T;
}