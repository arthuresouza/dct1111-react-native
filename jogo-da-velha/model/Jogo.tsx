
/**
 * Classe Jogo que representa um tabuleiro do Jogo da Velha
 * 
*/
export class Jogo {

    /** Representa o número de Jogadas Efetuadas */
    numeroJogadas: number;

    /* Campo que representa o array que representa as células do tabuleiro:
    * 0 - 1 - 2
    * 3 - 4 - 5
    * 6 - 7 - 8
    * */
    tabuleiro: string[];

    static jogadorX = "X";
    static jogadorO = "O";

    constructor() {
        this.numeroJogadas = 0;
        this.tabuleiro = Array(9).fill("");
    }

    /** Registra Jogada pelo Jogador: X */
    jogarX(celula: number) {
        this.numeroJogadas++;
        this.registrarJogada(celula, Jogo.jogadorX);
    }

    /** Registra Jogada pelo Jogador: O */
    jogarO(celula: number) {
        this.numeroJogadas++;
        this.registrarJogada(celula, Jogo.jogadorO);
    }

    /** Registra Jogada no Tabuleiro */
    private registrarJogada(celula: number, jogador: string) {
        this.tabuleiro[celula] = jogador;
    }

    /** Recupera qual o valor da célula do tabuleiro (X, O ou "")*/
    getValorCelula(celula: number): string {
        let valor = this.tabuleiro.at(celula)
        return valor ? valor : "";
    }

    /** Retorna todas as jogadas já realizadas */
    getAll(): string[] {
        let jogadas = this.tabuleiro.filter(e => e !== "");
        //console.log(jogadas.toString);
        return jogadas;
    }

    /**
     * Calcula um vencedor
     * @param moves recebe um array de movimentos
     * @returns string que indica o jogador que venceu ou null caso não haja vencedor
    */

    verificaVencedor(): string {
        const linhas = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < linhas.length; i++) {
            const [a, b, c] = linhas[i];
            if (this.tabuleiro.at(a) && this.tabuleiro.at(a) === this.tabuleiro.at(b) && this.tabuleiro.at(a) === this.tabuleiro.at(c)) {
                return this.tabuleiro[a];
            }
        }
        return "";
    }
}