const db = require('../db/connection');

const Docente = {
  create: (data, callback) => {
    const query = `
      INSERT INTO docente (rut, nombre, apellido, correo, fecha_nacimiento, ensayos_generados)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.rut,
      data.nombre,
      data.apellido,
      data.correo,
      data.fecha_nacimiento,
      data.ensayos_generados || 0  // default to 0 if not provided
    ];
    db.query(query, values, callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM docente';
    db.query(query, callback);
  },

  getByRut: (rut, callback) => {
    const query = 'SELECT * FROM docente WHERE rut = ?';
    db.query(query, [rut], callback);
  },

  update: (rut, data, callback) => {
    const query = `
      UPDATE docente
      SET nombre = ?, apellido = ?, correo = ?, fecha_nacimiento = ?, ensayos_generados = ?
      WHERE rut = ?
    `;
    const values = [
      data.nombre,
      data.apellido,
      data.correo,
      data.fecha_nacimiento,
      data.ensayos_generados,
      rut
    ];
    db.query(query, values, callback);
  },

  delete: (rut, callback) => {
    const query = 'DELETE FROM docente WHERE rut = ?';
    db.query(query, [rut], callback);
  }
};

module.exports = Docente;
