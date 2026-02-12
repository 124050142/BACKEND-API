const pool = require('../config/db');

const buscarProductoPorNombre = async (request, response) => {
    try {
        const { nombre } = request.query;

        if (!nombre) {
            return response.status(400).json({ error: 'El parámetro nombre es requerido' });
        }

        const query = `
            SELECT * FROM productos
            WHERE nombre ILIKE $1
            ORDER BY nombre
        `;

        const result = await pool.query(query, [`%${nombre}%`]);

        response.status(200).json({
            cantidad: result.rows.length,
            productos: result.rows
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        response.status(500).json({ error: error.message });
    }
};

module.exports = { buscarProductoPorNombre };