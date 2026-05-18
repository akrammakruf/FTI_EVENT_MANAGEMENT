const express = require('express'); const router = express.Router(); const c = require('../controllers/eventController');
router.get('/', c.index); router.get('/add', c.create); router.post('/', c.store); router.get('/:id', c.show); module.exports = router;
