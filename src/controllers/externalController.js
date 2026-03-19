const pool = require('../config/db');

const poblarProductos = async (request, response) => {
    try {
        // Fetch FakeStoreApi
        console.log("Iniciando carga masiva de productos...");
        const apiFetch = await fetch('http://fakestoreapi.com/products');
        const products = await apiFetch.json();
console.log(`Productos obtenidos: ${products.length}`);
        let inserciones = 0;
        // Destructurar el objeto
        for(const product of products){
            const { title, price, description, image} = product;

            const stock = Math.floor(Math.random() * 50) + 1;

            const query = `
                INSERT INTO productos
                (nombre, precio, stock, descripcion, imagen_url)
                VALUES ($1, $2, $3, $4, $5)
            `
console.log(`Insertando producto: ${title}`);
            await pool.query(query, [title, price, stock, description, image]);

            inserciones++;
        }
        response.status(200).json(
            {
                mensaje: "Carga masiva exitosa", 
                cantidad: inserciones
            }
        );
    } catch (error) {
        console.log(`Error: ${error}`);
        response.status(500).json({error: error.message})
    }
};
const getProductos = async (request, response) => {
    try {
        const query = `
            SELECT * FROM productos
            ORDER BY nombre
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

module.exports = { poblarProductos, getProductos };