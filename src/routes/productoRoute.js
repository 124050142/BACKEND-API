
const express = require('express');
const router = express.Router();
const controllerProductos = require('../controllers/productoController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/search', controllerProductos.buscarProductoPorNombre); 
router.get('/', controllerProductos.buscarProductos);
router.post('/', authMiddleware, controllerProductos.crearProducto);

module.exports = router;