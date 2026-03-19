const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (userResult.rows.length === 0) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const usuario = userResult.rows[0];

        const isMatch = await bcrypt.compare(password, usuario.password);
        
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }
        const payload = {
          id: usuario.id,   
          role: usuario.role,
          email: usuario.email  
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.status(200).json({
            msg: 'Login exitoso',
            token
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: error.message });
    }
};



const register = async (req, res) => {
    const {email, password} = req.body;

    try {
        const userExist = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if(userExist.rows.length > 0){
            return res.status(400).json({error: 'El usuario ya existe'});
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash  = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *',
            [email, passwordHash]
        );
        
        res.status(201).json({
            msg: 'Usuario registrado exitosamente',
            user: newUser.rows[0]
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({error: error.message});
    }
};

module.exports = { register, login };