const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumno.controller');

router.post('/', alumnoController.createAlumno);
router.get('/', alumnoController.getAlumnos);
router.get('/:rut', alumnoController.getAlumnoByRut); // ← Denne linjen er ny
router.put('/:rut', alumnoController.updateAlumno);
router.delete('/:rut', alumnoController.deleteAlumno);

module.exports = router;