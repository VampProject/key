const express = require('express');
const mysql = require('mysql2');
const app = express();

// CONFIGURACIÓN DE TU DB DE INFINITYFREE
const db = mysql.createConnection({
    host: 'sql306.infinityfree.com', 
    user: 'if0_40751474',
    password: 'v0d36YfvWX3pO6',
    database: 'if0_40751474_keys',
    port: 3306
});

db.connect(err => {
    if (err) console.error('Error conectando a la DB:', err);
    else console.log('Conectado a la base de datos de InfinityFree');
});

// Ruta que usará Roblox
app.get('/verify', (req, res) => {
    const key = req.query.key;
    if (!key) return res.send('no_key');

    db.query('SELECT * FROM rayfield_keys WHERE key_value = ?', [key], (err, results) => {
        if (err) return res.status(500).send('db_error');
        if (results.length > 0) {
            res.send('valid');
        } else {
            res.send('invalid');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
