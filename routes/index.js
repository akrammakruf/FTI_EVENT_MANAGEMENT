const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.render('home', { title: 'FTI Event Management' }));
router.get('/login', (req, res) => res.render('login', { title: 'Login' }));
router.post('/login', (req, res) => { req.session.user = { nama: req.body.username || 'Admin', role: 'admin' }; res.redirect('/'); });
router.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/login')));
module.exports = router;
