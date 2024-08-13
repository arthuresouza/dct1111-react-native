import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase("messages.db");

export const createTable = () => {
  db.transaction(txn => {
    txn.executeSql(
      "CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, text TEXT)",[],(txnObj,res) => {
        console.log(res);      
      });
  });
};

export const getMessages = (callback) => {
  db.transaction(txn => {
    txn.executeSql(
      `SELECT * FROM messages`,
      [],
      (sqlTxn, res) => {
        let len = res.rows.length;
        if (len > 0) {
          let results = [];
          for (let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            results.push(item);
          }
          callback(results);
        } else {
          callback([]);
        }
      },
      error => {
        console.log('Erro lendo as mensagens: ' + error.message);
      }
    );
  });
};

export const insertMessage = (message, callback) => {
  db.transaction(txn => {
    txn.executeSql(
      `INSERT INTO messages (email, text) VALUES (?, ?)`,
      [message.email, message.text],
      (sqlTxn, res) => {
        console.log('Mensagem inserida com sucesso');
        callback({ id: res.insertId, ...message });
      },
      error => {
        console.log('Erro inserindo mensagem: ' + error.message);
      }
    );
  });  
};

export const updateMessage = (message, callback) => {
  db.transaction(txn => {
    txn.executeSql(
      `UPDATE messages SET email = ?, text = ? WHERE id = ?`,
      [message.email, message.text, message.id],
      () => {
        console.log('Mensagem Atualizada com sucesso');
        callback();
      },
      error => {
        console.log('Erro atualizando mensagem: ' + error.message);
      }
    );
  });
};

export const deleteMessage = (messageId, callback) => {
  db.transaction(txn => {
    txn.executeSql(
      `DELETE FROM messages WHERE id = ?`,
      [messageId],
      () => {
        console.log('Mensagem deletada com sucesso');
        callback();
      },
      error => {
        console.log('Erro na deleção da mensagem: ' + error.message);
      }
    );
  });
};