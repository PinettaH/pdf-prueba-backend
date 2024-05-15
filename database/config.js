import { createPool } from "mysql2/promise";

export const pool = createPool({
    // host: '192.168.0.27',
    host: 'localhost',
    port: 3306,
    user: 'admin',
    // password: 'Administrador',
    password: 'admin',
    database: 'personal'
})