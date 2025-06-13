const Docente = require('../models/docente.model');

// Opprett ny lærer
exports.createDocente = (req, res) => {
  const data = req.body;

 if (!data.rut || !data.nombre || !data.apellido || !data.correo || !data.fecha_nacimiento) {
  return res.status(400).json({ error: 'Fyll inn alle påkrevde felter' });
}

  Docente.create(data, (err, result) => {
    if (err) {
      console.error('Feil ved oppretting av lærer:', err);
      return res.status(500).json({ error: 'Databasefeil ved oppretting av lærer' });
    }
    res.status(201).json({ message: 'Lærer opprettet', result });
  });
};

// Hent alle lærere
exports.getAllDocentes = (req, res) => {
  Docente.getAll((err, rows) => {
    if (err) {
      console.error('error while getting techer:', err);
      return res.status(500).json({ error: 'database error' });
    }
    res.status(200).json(rows);
  });
};

// Hent lærer via RUT
exports.getDocenteByRut = (req, res) => {
  const rut = req.params.rut;

  Docente.getByRut(rut, (err, rows) => {
    if (err) {
      console.error('Feil ved henting av lærer:', err);
      return res.status(500).json({ error: 'Databasefeil' });
    }
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Lærer ikke funnet' });
    }
    res.status(200).json(rows[0]);
  });
};

// Oppdater lærer
exports.updateDocente = (req, res) => {
  const rut = req.params.rut;
  const data = req.body;

  Docente.update(rut, data, (err, result) => {
    if (err) {
      console.error('Feil ved oppdatering:', err);
      return res.status(500).json({ error: 'Databasefeil ved oppdatering' });
    }
    res.status(200).json({ message: 'Lærer oppdatert', result });
  });
};

// Slett lærer
exports.deleteDocente = (req, res) => {
  const rut = req.params.rut;

  Docente.delete(rut, (err, result) => {
    if (err) {
      console.error('Feil ved sletting:', err);
      return res.status(500).json({ error: 'Databasefeil ved sletting' });
    }
    res.status(200).json({ message: 'Lærer slettet', result });
  });
};
