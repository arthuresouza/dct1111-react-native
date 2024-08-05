import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { createTable, getMessages, insertMessage, updateMessage, deleteMessage } from './db';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [editingMessage, setEditingMessage] = useState(null);

  useEffect(() => {
    createTable();
    loadMessages();
  }, []);

  const loadMessages = () => {
    getMessages(setMessages);
  };

  const handleAddMessage = () => {
    if (email.trim() === '' || text.trim() === '') {
      alert('Email e Mensagem devem ser preenchidos');
      return;
    }
    if (editingMessage) {
      updateMessage({ id: editingMessage.id, email, text }, () => {
        loadMessages();
        setEmail('');
        setText('');
        setEditingMessage(null);
        loadMessages(setMessages);
      });
    } else {
      insertMessage({ email, text }, (newMessage) => {
        setMessages([...messages, newMessage]);
        setEmail('');
        setText('');
        loadMessages(setMessages);
      });
    }
  };

  const handleEditMessage = (message) => {
    setEmail(message.email);
    setText(message.text);
    setEditingMessage(message);
  };

  const handleDeleteMessage = (messageId) => {
    deleteMessage(messageId, loadMessages);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.email}</Text>
      <Text>{item.text}</Text>
      <View style={styles.buttons}>
        <Button title="Editar" onPress={() => handleEditMessage(item)} />
        <Button title="Excluir" onPress={() => handleDeleteMessage(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar/>
      <Text>SQLite Mensagens</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Messagem"
        value={text}
        onChangeText={setText}
      />
      <Button title={editingMessage ? "Atualizar" : "Adicionar"} onPress={handleAddMessage} />
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  text:{
    fontSize: 24,
    fontWeight: 'bold',
    padding: 3
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default App;