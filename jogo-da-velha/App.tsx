import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { JogoView } from './view/JogoView';
import { JogoVM } from './viewModel/JogoVM';

/** Aplicação de Exemplo do Jogo da Velha
 * @author Arthur Souza DCT UFRN
 */
export default function App() {
  /** Variáveis de Dados e Funções de Vinculação entre a View e o Modelo */
  const {
        jogadorX,
        jogo,
        historico,
        status,
        manipulaJogada,
        recuperaHistorico,
        resetGame,
    } = JogoVM();
  
  return (
    <View style={styles.container}>
      <JogoView historico={historico} jogo={jogo} jogadorX={jogadorX} status={status} manipulaJogada={manipulaJogada} recuperaHistorico={recuperaHistorico}  resetGame={resetGame}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
