import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase("jsonplace-cache.db");

export const createTableComments = () => {
  //Inserir Código para criar tabela de Comments
};

export const getCommentsDB = (postId, callback) => {
  //Inserir Código para consultar Comments do banco local
};

export const insertCommentsDB = (postId,comments) => {
  //Inserir Código para inserir Comments no banco local
};

export const updateCommentDB = (postId,comment) => {
  //Inserir Código para Atualizar o Comments no Banco Local
};

export const deleteCommentDB = (postId, commentId) => {
  //Inserir Código para Deletar o Comment do Banco Local
};