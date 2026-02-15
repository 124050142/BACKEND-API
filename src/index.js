const express = require('express');
const cors = require('cors');
const path = require('path');
const productoRouter = require('./routes/productoRoute');
const categoriaRouter = require('./routes/categoriaRoute');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/productos', productoRouter);
app.use('/api/categoria', categoriaRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));