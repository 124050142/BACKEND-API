const pool = require('../config/db');

const poblarCategorias = async (request, response) => {
    try {
        
        const apiFetch = await fetch('http://fakestoreapi.com/products');
        const products = await apiFetch.json();

        
        const categoriasUnicas = [...new Set(products.map(product => product.category))];

        let inserciones = 0;

        for (const nombreCategoria of categoriasUnicas) {
            const query = `
                INSERT INTO categoria (nombre)
                VALUES ($1)
                ON CONFLICT DO NOTHING
            `;

            await pool.query(query, [nombreCategoria]);
            inserciones++;
        }

        response.status(200).json({
            mensaje: "Categorías pobladas exitosamente",
            cantidad: inserciones
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        response.status(500).json({ error: error.message });
    }
};

const buscarCategoriaPorNombre = async (request, response) => {
    try {
        const { nombre } = request.query;

        if (!nombre) {
            return response.status(400).json({ error: 'El parámetro nombre es requerido' });
        }

        const query = `
            SELECT * FROM categoria
            WHERE nombre ILIKE $1
            ORDER BY nombre
        `;

        const result = await pool.query(query, [`%${nombre}%`]);

        response.status(200).json({
            cantidad: result.rows.length,
            categorias: result.rows
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        response.status(500).json({ error: error.message });
    }
};

module.exports = { poblarCategorias, buscarCategoriaPorNombre };