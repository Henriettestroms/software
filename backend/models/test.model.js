const db = require('../db/connection');

const Test = {
  create: (data, callback) => {
    const query = `INSERT INTO test (course, teacher_rut, name) VALUES (?, ?, ?)`;
    db.query(query, [data.course, data.teacher_rut, data.name], callback);
  },

  update: (id, data, callback) => {
    const query = `UPDATE test SET course = ?, teacher_rut = ?, name = ? WHERE id = ?`;
    db.query(query, [data.course, data.teacher_rut, data.name, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM test WHERE id = ?', [id], callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM test WHERE id = ?', [id], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]);
    });
  },

  getByCourse: (course, callback) => {
    db.query('SELECT * FROM test WHERE course = ?', [course], callback);
  }
};

module.exports = Test;