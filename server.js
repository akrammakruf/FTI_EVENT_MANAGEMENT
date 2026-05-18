const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const db = require('./models/db');

const indexRoutes = require('./routes/index');
const eventRoutes = require('./routes/eventRoutes');
const pesertaRoutes = require('./routes/pesertaRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const checkinRoutes = require('./routes/checkinRoutes');
const sertifikatRoutes = require('./routes/sertifikatRoutes');

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'fti-event-management-secret', resave: false, saveUninitialized: true }));

app.use('/', indexRoutes);
app.use('/events', eventRoutes);
app.use('/peserta', pesertaRoutes);
app.use('/reminder', reminderRoutes);
app.use('/checkin', checkinRoutes);
app.use('/sertifikat', sertifikatRoutes);
app.use('/auth', authRoutes);
app.use((req, res) => res.status(404).render('404', { title: '404 - Halaman Tidak Ditemukan' }));

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
