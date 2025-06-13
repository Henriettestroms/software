const db = require('../db/connection');

const Question = {
  create: (data, callback) => {
    const query = `INSERT INTO question (test_id, text) VALUES (?, ?)`;
    db.query(query, [data.test_id, data.text], callback);
  },

  getByTest: (testId, callback) => {
    db.query('SELECT * FROM question WHERE test_id = ?', [testId], callback);
  }
};

module.exports = Question;