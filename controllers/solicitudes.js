import { pool } from "../database/config.js";


export const crearSolicitud = async (req, res) => {
    const { dni, categoriaSolicitud, empleado } = req.body
    try {
        if (dni === null) {
            res.status(404).json({
                ok: false,
                msg: 'Por favor ingrese un dni'
            })
        } else {
            if (categoriaSolicitud === null) {
                res.status(404).json({
                    ok: false,
                    msg: 'Por favor ingrese una categoria'
                })
            } else {
                console.log(dni, empleado.nombre)
                const result = await pool.query(
                    'INSERT INTO solicitudes (empleadoDni, empleadoNombre, empleadoEmail, categoriaSolicitud) VALUES (?, ?, ?, ?)', [dni, empleado.nombre, empleado.email, categoriaSolicitud], (err, results) => {
                        if (err) {
                            console.error('Error al insertar los valores:', err);
                            return;
                        }
                        console.log('Valores insertados correctamente.');
                    });
                res.status(200).json({
                    ok: true,
                    msg: "Solicitada correctamente"
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

export const fetchSolicitudes = async (req, res) => {
    try {
        const [results] = await pool.query(
            'SELECT * FROM solicitudes'
        )
        res.status(200).json({
            ok: true,
            data: results
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }
}

export const fetchSolicitudesByDni = async (req, res) => {
    const { dni } = req.params
    try {
        console.log(dni)
        const [results] = await pool.query(
            'SELECT * FROM solicitudes WHERE empleadoDni = ?',
            [dni]
        );
        res.status(200).json({
            ok: true,
            msg: 'Dni recibido',
            dni: dni,
            data: results
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador',
            error: error
        })
    }
}