import { Tabuada } from './tabuada';

export class Treino {

    id:number = 0;
    tabuada:Tabuada = new Tabuada();
    tempoInicial:Date = new Date();
    tempoFinal:Date = new Date();
    certo:boolean = false;

    criarTreino(id:number, tabuada: Tabuada) {
        this.id = id;
        this.tabuada = tabuada;
        this.tempoInicial = new Date();
    }

    finalizarTreino(certo: boolean) {
        this.tempoFinal = new Date();
    }

}