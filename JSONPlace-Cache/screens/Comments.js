import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { createTableComments, getCommentsDB, insertCommentDB, updateCommentDB, deleteCommentDB, isCachedDB, insertCommentsDB } from '../db';

export default function Comments({ navigation, route }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');  
  const [editingId, setEditingId] = useState(null);

  const postId = route.params.postId;
  const JsonPlaceholder_API = 'https://jsonplaceholder.typicode.com/comments';
  
  useEffect(() => {
    //Criando tabela de cache de Comentários
    createTableComments();
    //Carregando Comentários
    loadComments();    
  }, []);

  const loadComments = async () => {
    //Lendo dados do DB
    getCommentsDB(postId,setComments);
    try{
      //Caso o banco não tenha postagens cadastradas 
      if(comments.length == 0){
        //Inserir Código para ler a API do JSONPlace e Salvar os Comments no Banco Local        
      }
    } catch (error) {
      console.error('Erro ao carregar os comentários', error);
    }             
  };  

  //Adicionar um comentário
  const addComment = () => {
    if (name && body && email) {
      //Inserir Código para salva o comment na API e no Banco
    }
  };

  //Atualizar Comentário
  const updateComment = () => {
    if (name && body && email && editingId) {
      //Inserir Código para atualizar o comment na API e no Banco
    }
  };

  //Deletando comentário
  const deleteComment = id => {
    //Inserir Código para deletar o comment na API e no Banco
  };

  //Populando os dados do comentario
  const editComment = comment => {
    setName(comment.name);
    setBody(comment.body);
    setEmail(comment.email);
    setEditingId(comment.id);
  };

  const clearForm = () => {
    setName('');
    setBody('');
    setEmail('');
    setEditingId(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.body}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Editar" onPress={() => editComment(item)} />
        <Button title="Excluir" onPress={() => deleteComment(item.id)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Comentário"
        value={body}
        onChangeText={setBody}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <Button
        title={editingId ? "Atualizar Comentário" : "Adicionar Comentário"}
        onPress={editingId ? updateComment : addComment}
      />
      <FlatList
        data={comments}
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