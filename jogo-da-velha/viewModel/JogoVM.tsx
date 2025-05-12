import { Jogo } from '../model/Jogo';
import { useState } from 'react';
import Historico from '../model/Historico';
import { Jogada } from '../model/Jogada';

/** Componente ViewModel que vincula os dados de Modelo com a Visão
 * Armazena as variáveis que simulam os dados em Memória para ser utilizadas pela Visão em conjunto com as regras
 * de negócio do Modelo.
 */
export function JogoVM() {
    /** Representa  é a vezJogador X. Inicia como verdadeiro já que o X sempre começa. */
    const [jogadorX, setJogadorX] = useState(true);
    /** Representa o estado do Jogo */
    const [jogo, setJogo] = useState<Jogo>(new Jogo());
    /** Representa o histórico do Jogo. */
    const [historico, setHistorico] = useState<Historico>(new Historico());
    /** Representa o status do Jogo. Inicia indicando a próxima Jogada como sendo o X*/
    const [status, setStatus] = useState("Próxima Jogada: X");

    /** Verifica se o Jogo já teve um vencedor 
     * @returns verdadeiro caso sim
    */
    function verificaVencedor(): boolean {
        let vencedor = jogo.verificaVencedor();
        if (jogo.verificaVencedor() !== "") {
            setStatus("Vencedor: " + vencedor);
            return true;
        }
        return false;
    }

    /** Efetua uma jogada e atualiza a View conforme a escolha do usuário
     * Funciona como um tratador de evento iniciados pela View
      */
    function manipulaJogada(i: number) {
        if (!verificaVencedor()) {
            if (jogadorX) {
                jogo.jogarX(i);
                historico.salvarJogada(new Jogada(i, "X"));
                setJogadorX(false);
                setStatus('Próxima Jogada: O');
            } else {
                jogo.jogarO(i)
                historico.salvarJogada(new Jogada(i, "O"));
                setJogadorX(true);
                setStatus('Próxima Jogada: X');
            }            
            if(verificaVencedor()) return;            
        }        
    }

    /** Reinicia o Jogo */
    function resetGame(){
        setJogo(new Jogo());
        setHistorico(new Historico());
        setStatus("Próxima Jogada: X")
        setJogadorX(true);
    }

    /** Recupera o Jogo a um estado de Histórico anterior */
    function recuperaHistorico(numeroJogada: number) {
        let novoJogo = new Jogo();
        let novoHistorico = new Historico();
        let historicoJogadas = historico.getAll();
        for (let i = 0; i <= numeroJogada; i++) {
            let jogada = historicoJogadas[i];
            if (jogada.jogador === "X") {
                novoJogo.jogarX(jogada.celula);
                setJogadorX(false);
                setStatus('Próxima Jogada: O');
            }
            if (jogada.jogador === "O") {
                novoJogo.jogarO(jogada.celula);
                setJogadorX(true);
                setStatus('Próxima Jogada: X');
            }
            novoHistorico.salvarJogada(jogada);
        }
        setJogo(novoJogo);
        setHistorico(novoHistorico);
       
    }

    return {
        jogadorX,
        jogo,
        historico,
        status,
        manipulaJogada,
        recuperaHistorico,
        resetGame
    }
}