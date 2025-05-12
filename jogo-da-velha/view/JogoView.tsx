import { View, Button, ScrollView, StyleSheet, Text, Image } from 'react-native';
import { Tabuleiro } from './Tabuleiro';
import { Jogo } from '../model/Jogo';
import Historico from '../model/Historico';


/** Indentifica os dados e tipos necessários das Propriedades de JogoView */
interface JogoViewProps {
  jogadorX: boolean,
  jogo: Jogo
  historico: Historico
  status: string,
  recuperaHistorico: (jogada: number) => any,
  manipulaJogada: (celula: number) => void,
  resetGame: () => void;
}

/** Representa a UI do Jogo com o Tabuleiro e o Histórico 
 * @param jogo - estado do Jogo
 * @param manipulaJogada - função que realiza a Jogada
 * @param historico - estado do Histórico de Jogadas
 * @param recuperaHistorico - função que recupera o jogo ao estado de um histórico anterior
 * @param resetGame - função que reinicializa o jogo
*/
export function JogoView({ jogo, manipulaJogada, status, historico, recuperaHistorico, resetGame} : JogoViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Button onPress={resetGame} title='Reiniciar' />
        <Text style={styles.status}>{status}</Text>        
      </View>
      <Tabuleiro jogo={jogo} manipulaJogada={manipulaJogada} />
      <View style={styles.moves}>
        <Text style={styles.status}>Histórico</Text>
        <ScrollView >
          {historico.getAll().map((jogada, numeroJogada: number) => (
            <Button
              key={numeroJogada}
              title={`Jogada: ${numeroJogada+1} -> ${jogada.jogador} - ${jogada.celula}`}
              onPress={() => recuperaHistorico(numeroJogada)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
    alignItems: 'center',
    flex: 2,
  },
  moves: {
    marginTop: 20,
    width: '100%',
    flex: 1,
    justifyContent: "space-between",
  },
  status: {
    fontSize: 24,
    marginBottom: 15,
    color: "blue",
  },
  head:{
    marginEnd: 3,
    justifyContent: "space-around"
  }
});