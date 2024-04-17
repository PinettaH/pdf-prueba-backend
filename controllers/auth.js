import { pool } from "../database/config.js";

export const loginUsuario = async (req, res) => {
    const { loginEmail, loginPassword } = req.body
    // console.log(loginEmail, loginPassword)
    try {
        const [result] = await pool.query(
            'SELECT * FROM usuarios WHERE email = ? ', [
            loginEmail
        ])
        console.log(result)
        res.status(200).json({
            ok: true,
            data: result
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error
        })
    }

}