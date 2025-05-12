/**
 * Classe que representa as jogadas dos jogadores.
 **/

export class Jogada{

    celula: number;
    jogador: string;
    
    constructor(celula: number, jogador: string ){
        this.celula = celula;
        this.jogador = jogador;
    }
}