import { pool } from "../database/config.js";

export const obtenerUsuarios = async (req, res) => {
    console.log("Obtener: Soliciud recibida");
    try {

        const [result] = await pool.query("SELECT * FROM usuario")
        res.status(200).json({
            ok: true,
            resultados: result//result[0]
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}