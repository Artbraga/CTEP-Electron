import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root', })
export class RoutingService {
    private values: { [id: string]: string; } = {};

    possuiValor(key: string): boolean {
        return this.values[key] != null;
    }

    buscarValor(key: string): string {
        return this.values[key];
    }

    salvarValor(key: string, valor: string): void {
        this.values[key] = valor;
    }

    excluirValor(key: string): string {
        const valor = this.values[key];
        this.values[key] = null;
        return valor;
    }
}
