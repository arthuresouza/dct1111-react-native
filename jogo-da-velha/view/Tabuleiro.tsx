import { View, Text, StyleSheet } from 'react-native';
import { Jogo } from '../model/Jogo';
import Celula from './Celula';

/** Indentifica os dados e tipos necessários das Propriedades de Tabuleiro */
interface TabuleiroProps {
    jogo: Jogo;
    manipulaJogada: (celula: number) => void;
}

/** Representa o UI do Tabuleiro 
 * @param jogo - representa o estado do Jogo
 * @param manipulaJogada - função que manipula o jogo para registrar a jogada
*/
export function Tabuleiro({ jogo, manipulaJogada } : TabuleiroProps) {

 return (
        <View style={styles.container}>           
            <View style={styles.row}>
                <Celula value={jogo.getValorCelula(0)} onPress={() => manipulaJogada(0)} />
                <Celula value={jogo.getValorCelula(1)} onPress={() => manipulaJogada(1)} />
                <Celula value={jogo.getValorCelula(2)} onPress={() => manipulaJogada(2)} />
            </View>
            <View style={styles.row}>
                <Celula value={jogo.getValorCelula(3)} onPress={() => manipulaJogada(3)} />
                <Celula value={jogo.getValorCelula(4)} onPress={() => manipulaJogada(4)} />
                <Celula value={jogo.getValorCelula(5)} onPress={() => manipulaJogada(5)} />
            </View>
            <View style={styles.row}>
                <Celula value={jogo.getValorCelula(6)} onPress={() => manipulaJogada(6)} />
                <Celula value={jogo.getValorCelula(7)} onPress={() => manipulaJogada(7)} />
                <Celula value={jogo.getValorCelula(8)} onPress={() => manipulaJogada(8)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
});
