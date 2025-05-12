import { Jogada } from "./Jogada";

/**
 * Classe que armazena o histórico de movimentos do Jogo
 * 
*/
class Historico {

    historico: Jogada[];

    constructor() {
        this.historico = Array(9).fill(null);
    }

    /**
      * Adiciona um estado ao histórico
      */
    salvarJogada(jogada: Jogada) {
        this.historico.push(jogada);
    }

    /**
      * Recupera um estado específico do histórico
      */
    getJogada(numeroJogada: number): Jogada | undefined {
        return this.historico.at(numeroJogada);
    }
    /**
      * Recupera todas as jogadas do histórico
      */

    getAll(): Jogada[] {
        return this.historico.filter(e => e !== null);
    }
}

export default Historico;