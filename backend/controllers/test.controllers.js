const Test = require('../models/test.model');
const Question = require('../models/question.model');
const Option = require('../models/option.model');
const StudentAnswer = require('../models/studentAnswer.model');
const db = require('../db/connection');

exports.createTest = (req, res) => {
  const { course, teacher_rut, name, questions } = req.body;
  if (!course || !teacher_rut || !name || !Array.isArray(questions)) {
    return res.status(400).json({ error: 'Missing data' });
  }

  Test.create({ course, teacher_rut, name }, (err, result) => {
    if (err) {
      console.error('Error creating test:', err);
      return res.status(500).json({ error: 'Error creating test' });
    }
    const testId = result.insertId;
    const promises = questions.map(q => new Promise((resolve, reject) => {
      Question.create({ test_id: testId, text: q.text }, (err2, qRes) => {
        if (err2) return reject(err2);
        const qId = qRes.insertId;
        const optionPromises = q.options.map(o => new Promise((resOp, rejOp) => {
          Option.create({ question_id: qId, text: o.text, is_correct: !!o.is_correct }, (err3) => {
            if (err3) return rejOp(err3);
            resOp();
          });
        }));
        Promise.all(optionPromises).then(resolve).catch(reject);
      });
    }));

    Promise.all(promises)
      .then(() => res.status(201).json({ message: 'Test created', id: testId }))
      .catch(e => {
        console.error('Error creating test structure:', e);
        res.status(500).json({ error: 'Error creating test structure' });
      });
  });
};

exports.getTestsByCourse = (req, res) => {
  const course = req.params.course;
  Test.getByCourse(course, (err, rows) => {
    if (err) {
      console.error('Error fetching tests:', err);
      return res.status(500).json({ error: 'Error fetching tests' });
    }
    res.status(200).json(rows);
  });
};

exports.getTestForStudent = (req, res) => {
  const id = req.params.id;
  Test.getById(id, (err, test) => {
    if (err || !test) {
      return res.status(404).json({ error: 'Test not found' });
    }
    Question.getByTest(id, (errQ, questions) => {
      if (errQ) {
        console.error(errQ);
        return res.status(500).json({ error: 'Error fetching questions' });
      }
      const qPromises = questions.map(q => new Promise((resolve, reject) => {
        Option.getByQuestion(q.id, (errO, opts) => {
          if (errO) return reject(errO);
          // Hide is_correct field
          const options = opts.map(o => ({ id: o.id, text: o.text }));
          resolve({ id: q.id, text: q.text, options });
        });
      }));
      Promise.all(qPromises).then(fullQuestions => {
        res.status(200).json({ id: test.id, name: test.name, course: test.course, questions: fullQuestions });
      }).catch(e => {
        console.error(e);
        res.status(500).json({ error: 'Error building test' });
      });
    });
  });
};

exports.submitTest = (req, res) => {
  const id = req.params.id;
  const { student_rut, answers } = req.body; // answers: [{question_id, option_id}]
  if (!student_rut || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Missing data' });
  }
  const answerPromises = answers.map(a => new Promise((resolve, reject) => {
    StudentAnswer.create({ test_id: id, question_id: a.question_id, student_rut, option_id: a.option_id }, err => {
      if (err) return reject(err);
      resolve();
    });
  }));
  Promise.all(answerPromises)
    .then(() => {
      const query = `SELECT q.id, q.text as question_text,
        o.id AS correct_option_id, o.text AS correct_text,
        sa.option_id, saOpt.text AS student_text
        FROM question q
        LEFT JOIN option o ON o.question_id = q.id AND o.is_correct = true
        LEFT JOIN student_answer sa ON sa.question_id = q.id AND sa.student_rut = ? AND sa.test_id = ?
        LEFT JOIN option saOpt ON saOpt.id = sa.option_id
        WHERE q.test_id = ?`;
      db.query(query, [student_rut, id, id], (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error calculating score' });
        }
        const total = rows.length;
        let correct = 0;
        const summary = rows.map(r => {
          if (r.option_id && r.option_id === r.correct_option_id) correct++;
          return {
            question: r.question_text,
            correct_option: r.correct_text,
            student_option: r.student_text || null
          };
        });
        const score = total === 0 ? 0 : Math.round((correct / total) * 100);
        res.status(200).json({ score, summary });
      });
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ error: 'Error submitting answers' });
    });
};