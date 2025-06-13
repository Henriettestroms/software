const Alumno = require('../models/alumno.model');

exports.createAlumno = (req, res) => {
  const nuevoAlumno = req.body;

  Alumno.create(nuevoAlumno, (err, result) => {
    if (err) {
      console.error("Error creating alumno:", err);
      return res.status(500).json({ error: "Failed to create alumno" });
    }
    res.status(201).json({ message: "Alumno created successfully" });
  });
};

exports.getAlumnoByRut = (req, res) => {
  const rut = req.params.rut;

  Alumno.getByRut(rut, (err, alumno) => {
    if (err) {
      console.error("Error fetching alumno by RUT:", err);
      return res.status(500).json({ error: "Error fetching alumno" });
    }

    if (!alumno) {
      return res.status(404).json({ error: "Alumno not found" });
    }

    res.status(200).json(alumno);
  });
};

exports.getAlumnos = (req, res) => {
  Alumno.getAll((err, results) => {
    if (err) {
      console.error("Error fetching alumnos:", err);
      return res.status(500).json({ error: "Error fetching alumnos" });
    }
    res.status(200).json(results);
  });
};

exports.updateAlumno = (req, res) => {
  const rut = req.params.rut;
  const data = req.body;

  if (!data.curso && !data.historial_ensayos) {
    return res.status(400).json({ message: "Nothing to update" });
  }

  Alumno.update(rut, data, (err, result) => {
    if (err) {
      console.error("Error updating alumno:", err);
      return res.status(500).json({ error: "Error updating alumno" });
    }
    res.status(200).json({ message: "Alumno updated successfully" });
  });
};

exports.deleteAlumno = (req, res) => {
  const rut = req.params.rut;

  Alumno.delete(rut, (err, result) => {
    if (err) {
      console.error("Error deleting alumno:", err);
      return res.status(500).json({ error: "Error deleting alumno" });
    }
    res.status(200).json({ message: "Alumno deleted successfully" });
  });
};