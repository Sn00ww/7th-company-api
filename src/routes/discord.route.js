const express = require('express');
const router = express.Router();
const discordController = require('../controllers/discord.controller');

router.get('/auth', discordController.redirect);
router.get('/authorize', discordController.authorize);
router.get('/revoke', discordController.revoke);

module.exports = router;