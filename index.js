import express from 'express';  // Version de import
import router from './routes/index.js';
import db from './config/db.js';

// const express = require('express');  // Version de commonjs

const app = express();

// Conectar la base de datos MySql
db.authenticate()
    .then( ( () => console.log('Base de datos conectada')) )
    .catch( error => console.log(error) );

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Creamos nuestro propio middleware
// Obtener el año actual
app.use( (req, res, next) => {
    const currentYear = new Date();
    res.locals.Year = currentYear.getFullYear();  // Creamos la variable y le asignamos el año
    res.locals.nombresitio = 'Agencia de Viajes';
    next();
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar router
app.use('/', router);


app.listen(port, () => {
    console.log(`El Servidor está funcionando en el puerto ${port}`);
})