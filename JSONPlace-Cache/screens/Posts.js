import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet, Button, TextInput, Alert } from 'react-native';

export default function Posts( { navigation }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingId, setEditingId] = useState(null);

  const JsonPlaceholder_API = 'https://jsonplaceholder.typicode.com/posts';

  //Baixando as postagens da JsonPlaceholder
  useEffect(() => {
    fetchPosts();
  }, []);

  //Baixando as postagens da JsonPlaceholder
  const fetchPosts = async () => {
    //Inserir Código de consultar os Posts da API
  };

  //Adicionar uma Postagem
  const addPost = () => {
    if (title && body) {
      //Inserir código para inserir postagem via API
    }
  };

  //Atualizar uma Postagem
  const updatePost = () => {
    if (title && body && editingId) {
      //Inserir Código de atualizar a postagem na API
    }
  };

  //Deletando Postagem
  const deletePost = id => {
    //Deletando a postagem da API
  };

  //Populando os dados da Postagem
  const editPost = post => {
    setTitle(post.title);
    setBody(post.body);
    setEditingId(post.id);
  };

  const clearForm = () => {
    setTitle('');
    setBody('');
    setEditingId(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.body}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Editar" onPress={() => editPost(item)} />
        <Button title="Comentários" onPress={() => navigation.navigate('Comments', { postId: item.id })} />
        <Button title="Excluir" onPress={() => deletePost(item.id)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Postagem"
        value={body}
        onChangeText={setBody}
      />
      <Button
        title={editingId ? "Atualizar Postagem" : "Adicionar Postagem"}
        onPress={editingId ? updatePost : addPost}
      />
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    marginTop: 8,
    fontStyle: 'italic',
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});