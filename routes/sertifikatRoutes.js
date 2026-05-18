const express = require('express'); const router = express.Router(); const c = require('../controllers/sertifikatController');
router.get('/', c.index); router.post('/generate', c.generate); router.get('/:id', c.show); module.exports = router;
