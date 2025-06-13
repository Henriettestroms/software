const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controllers');

router.post('/', testController.createTest);
router.get('/course/:course', testController.getTestsByCourse);
router.get('/:id', testController.getTestForStudent);
router.post('/:id/submit', testController.submitTest);

module.exports = router;