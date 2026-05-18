const express = require('express'); const router = express.Router(); const c = require('../controllers/reminderController');
router.get('/', c.index); router.post('/send', c.send); module.exports = router;
