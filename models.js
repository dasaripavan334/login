// Example using PostgreSQL with node-postgres
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({ /* Database connection details */ });

const createUser = async (name, email, password, address, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, email, hashedPassword, address, role];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
};

// ... other user model functions (getAll, getById, update, delete)