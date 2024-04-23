import { pool } from "../database/config.js";

export const loginUsuario = async (req, res) => {
    const { email, password } = req.body
    try {
        console.log(password)
        const [result] = await pool.query(
            'SELECT * FROM usuarios WHERE email = ? ', [
            email
        ])
        console.log(result[0].clave, password)
        if (password === result[0].clave) {
            res.status(200).json({
                ok: true,
                data: result[0],
                nombre: result[0].nombre,
                apellido: result[0].apellido,
                email: result[0].email,
                clave: result[0].clave,
                dni: result[0].dni,
                rol: result[0].rol,
            })

        } else {
            res.status(404).json({
                ok: false,
                msg: "Contraseña incorrecta"
            })

        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error
        })
    }

}