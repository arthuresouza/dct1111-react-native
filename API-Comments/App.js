import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet, Button, TextInput, Alert } from 'react-native';

export default function App() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

  //Baixando os Comentários da JsonPlaceholder
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  };

  //Adicionar um comentário
  const addComment = () => {
    if (name && body && email) {
      fetch('https://jsonplaceholder.typicode.com/comments?postId=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          body,
          email,
        }),
      })
        .then(response => response.json())
        .then(newComment => {
          setComments([newComment, ...comments]);
          clearForm();
        })
        .catch(error => console.error('Error adding comment:', error));
    } else {
      Alert.alert('Preencha todos os campos');
    }
  };

  //Atualizar Comentário
  const updateComment = () => {
    if (name && body && email && editingId) {
      fetch(`https://jsonplaceholder.typicode.com/comments/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          body,
          email,
        }),
      })
        .then(response => response.json())
        .then(updatedComment => {
          const updatedComments = comments.map(comment =>
            comment.id === editingId ? updatedComment : comment
          );
          setComments(updatedComments);
          clearForm();
        })
        .catch(error => console.error('Error updating comment:', error));
    } else {
      Alert.alert('Preencha todos os campos');
    }
  };

  //Deletando comentário
  const deleteComment = id => {
    fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setComments(comments.filter(comment => comment.id !== id));
      })
      .catch(error => console.error('Error deleting comment:', error));
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
