const db = require('../db/connection');

const Option = {
  create: (data, callback) => {
    const query = `INSERT INTO option (question_id, text, is_correct) VALUES (?, ?, ?)`;
    db.query(query, [data.question_id, data.text, data.is_correct], callback);
  },

  getByQuestion: (questionId, callback) => {
    db.query('SELECT id, question_id, text, is_correct FROM option WHERE question_id = ?', [questionId], callback);
  }
};

module.exports = Option;