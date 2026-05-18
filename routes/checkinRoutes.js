const express = require('express'); const router = express.Router(); const c = require('../controllers/checkinController');
router.get('/', c.index); router.post('/', c.process); module.exports = router;
