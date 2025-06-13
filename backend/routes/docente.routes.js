const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docente.controller');

router.post('/docente', docenteController.createDocente);

router.get('/docente', docenteController.getAllDocentes);

router.get('/docente/:rut', docenteController.getDocenteByRut);

router.put('/docente/:rut', docenteController.updateDocente);

router.delete('/docente/:rut', docenteController.deleteDocente);

module.exports = router;
