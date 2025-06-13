const db = require('../db/connection');

const StudentAnswer = {
  create: (data, callback) => {
    const query = `INSERT INTO student_answer (test_id, question_id, student_rut, option_id) VALUES (?, ?, ?, ?)`;
    db.query(query, [data.test_id, data.question_id, data.student_rut, data.option_id], callback);
  },

  getByStudentAndTest: (studentRut, testId, callback) => {
    const query = `SELECT * FROM student_answer WHERE student_rut = ? AND test_id = ?`;
    db.query(query, [studentRut, testId], callback);
  }
};

module.exports = StudentAnswer;