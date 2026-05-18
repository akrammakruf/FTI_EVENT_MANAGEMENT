const db = require('../models/db');
exports.index = (req,res)=> db.query('SELECT * FROM events ORDER BY tanggal ASC',(err,rows)=>{ if(err) return res.status(500).send('Gagal mengambil data event'); res.render('event/daftar-event',{title:'Daftar Event',events:rows}); });
exports.create = (req,res)=> res.render('event/tambah-event',{title:'Tambah Event'});
exports.store = (req,res)=>{ const {nama_event,tanggal,lokasi,deskripsi}=req.body; db.query('INSERT INTO events (nama_event,tanggal,lokasi,deskripsi,status) VALUES (?,?,?,?,?)',[nama_event,tanggal,lokasi,deskripsi,'published'],err=>{ if(err) return res.status(500).send('Gagal menyimpan event'); res.redirect('/events'); }); };
exports.show = (req,res)=> db.query('SELECT * FROM events WHERE id=?',[req.params.id],(err,rows)=>{ if(err) return res.status(500).send('Gagal mengambil detail event'); if(!rows.length) return res.status(404).send('Event tidak ditemukan'); res.render('event/detail-event',{title:'Detail Event',event:rows[0]}); });
