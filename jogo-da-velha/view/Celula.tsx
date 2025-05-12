import { Text, StyleSheet, Image, View } from 'react-native';

/** Indentifica os propriedades de uma Celula do Tabuleiro */
interface CelulaProps {
  value: string;
  onPress: () => void;
}

/** Representa a UI de uma Celula do Tabuleiro  */
export default function Celula({ value, onPress }: CelulaProps) {
  /** Dinamiza a criação de uma Celula */
  function montaCelula(value: string, onPress: () => any) {
    if (value === "X")
      return <View style={styles.cell}><Image style={styles.images} source={require('../assets/images/xis.png')} /></View>
    else if (value === "O")
      return <View style={styles.cell}><Image style={styles.images} source={require('../assets/images/ball.png')} /></View>
    else
      return <View style={styles.cell}><Text onPress={onPress} style={styles.images}>{""}</Text></View>


  }
  return (
    montaCelula(value, onPress)
  );
}



const styles = StyleSheet.create({
  cell: {
    borderWidth: 2,
    borderColor: "light-gray",
    borderStyle: 'solid',
    width: 40,
    height: 40,
  },
  images: {
    width: 35,
    height: 35,
  }
});