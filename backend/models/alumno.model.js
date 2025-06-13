const db = require('../db/connection');

const Alumno = {
  create: (data, callback) => {
    const query = `
      INSERT INTO alumno (rut, nombre, apellido, curso, historial_ensayos, fecha_nacimiento, correo)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.rut,
      data.nombre, 
      data.apellido,
      data.curso, 
      JSON.stringify(data.historial_ensayos ?? []), 
      data.fecha_nacimiento, 
      data.correo
    ];
    db.query(query, values, callback);
  },

  getByRut: (rut, callback) => {
  db.query('SELECT * FROM alumno WHERE rut = ?', [rut], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
},

  update: (rut, data, callback) => {
    const query = `
      UPDATE alumno
      SET curso = ?, historial_ensayos = ?
      WHERE rut = ?
    `;
    const values = [data.curso, data.historial_ensayos, rut];
    db.query(query, values, callback);
  },

  getAll: (callback) => {
  const query = `SELECT * FROM alumno`;
  db.query(query, callback);
},

  delete: (rut, callback) => {
    const query = `DELETE FROM alumno WHERE rut = ?`;
    db.query(query, [rut], callback);
  }
};

module.exports = Alumno;
