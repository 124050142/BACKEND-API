const pool = require('../config/db');

const buscarProductoPorNombre = async (request, response) => {
    try {
        const { q } = request.query;

        if (!q) {
            return response.status(400).json({ error: 'El parámetro q es requerido' });
        }

        const query = `
            SELECT * FROM productos
            WHERE nombre ILIKE $1 OR descripcion ILIKE $1
            ORDER BY nombre
        `;

        const result = await pool.query(query, [`%${q}%`]);

        response.status(200).json({
            cantidad: result.rows.length,
            productos: result.rows
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        response.status(500).json({ error: error.message });
    }
};

const buscarProductos = async (request, response) => {
    try {

        const query = `
            SELECT * FROM productos
        `;

        const result = await pool.query(query);
        response.status(200).json({
            cantidad: result.rows.length,
            productos: result.rows
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        response.status(500).json({ error: error.message });
    }
};

const crearProducto = async (request, response) => {
    try {
        const { nombre, precio, stock, descripcion, imagen_url, id_categoria } = request.body;

        // Validación de campos requeridos
        if (!nombre || !precio || stock === undefined) {
            return response.status(400).json({ 
                error: 'Los campos nombre, precio y stock son requeridos' 
            });
        }

        const query = `
            INSERT INTO productos (nombre, precio, stock, descripcion, imagen_url, id_categoria, yotube_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;

        const result = await pool.query(query, [
            nombre, 
            precio, 
            stock, 
            descripcion || null, 
            imagen_url || null, 
            id_categoria || null,
            yotube_id || null
        ]);

        response.status(201).json({
            mensaje: 'Producto creado exitosamente',
            producto: result.rows[0]
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        response.status(500).json({ error: error.message });
    }
};

module.exports = { buscarProductoPorNombre, buscarProductos, crearProducto };