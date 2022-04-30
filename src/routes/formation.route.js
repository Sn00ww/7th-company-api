const express = require('express');
const router = express.Router();
const formationController = require('../controllers/formation.controller');

router.get('/', formationController.getFormations);
router.get('/:id', formationController.getFormation);
router.post('/', formationController.createFormation);
router.put('/:id', formationController.updateFormation);
router.delete('/:id', formationController.deleteFormation);

module.exports = router;