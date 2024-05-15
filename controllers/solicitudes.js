import { pool } from "../database/config.js";


export const crearSolicitud = async (req, res) => {

    const { dni, categoriaSolicitud, empleado, dia, mes, anio, diaFin, mesFin, anioFin } = req.body
    console.log(diaFin, mesFin, anioFin)
    console.log('crearSolicitud')
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
                    'INSERT INTO solicitudes (empleadoDni, empleadoNombre, empleadoEmail, categoriaSolicitud, diaSolicitado, mesSolicitado, anioSolicitado) VALUES (?, ?, ?, ?, ?, ?, ?)', [dni, empleado.nombre, empleado.email, categoriaSolicitud, dia, mes, anio], (err, results) => {
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
export const crearSolicitudFaltaConAviso = async (req, res) => {
    const {dni} = req.params
    const { categoriaSolicitud, empleado, dia, mes, anio } = req.body
    try{
            let msg = ''
            let ok = false
            const [faltasEnTotal] = await pool.query(
                'SELECT idsolicitudes FROM solicitudes WHERE empleadoDni = ? and categoriaSolicitud = ?',[dni, 'falta con aviso']
            )
            const [faltasMensual] = await pool.query(
                'SELECT idsolicitudes FROM solicitudes WHERE empleadoDni = ? and mesSolicitado = ? and categoriaSolicitud = ?',[dni, mes, 'falta con aviso']
            )
            if(faltasEnTotal.length >= 5) {
                msg='Supero el limite de falta por este año (5)'
            } else {
                if(faltasMensual.length === 0) {
                    
                    const insertFaltaConAviso = await pool.query(
                        'INSERT INTO solicitudes (empleadoDni, empleadoNombre, empleadoEmail, categoriaSolicitud, diaSolicitado, mesSolicitado, anioSolicitado) VALUES (?, ?, ?, ?, ?, ?, ?)', [dni, empleado.nombre, empleado.email, categoriaSolicitud, dia, mes, anio], (err, results) => {
                            if (err) {
                                console.error('Error al insertar los valores:', err);
                                return;
                            }
                            console.log('Valores insertados correctamente.');   
                        });
                        msg='Falta solicitada correctamente'
                        ok = true
                } else {
                    msg ='Este mes ya solicito falta con aviso'
                    ok =  false
                }
            }
                res.status(200).json({
                    ok,
                    msg
                })
           
    }catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
   
}
const queryInsertBd = async () => {
    console.log('funcion llamada')
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

export const updateEstadoSolicitud = async (req, res) => {
    const {idsolicitudes} = req.params
    const {estado} = req.body
    try {
        console.log(idsolicitudes)
        console.log(estado)
        const [results] = await pool.query('UPDATE solicitudes SET estado = ? WHERE idsolicitudes = ?', [estado, idsolicitudes], (error, results, fields) => {
            if (error) {
                console.error('Error al actualizar la solicitud:', error.message);
            } else {
                console.log('Solicitud actualizada exitosamente.');
            }
        })
        console.log(results.affectedRows)
        res.status(200).json({
            ok: true,
            results
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        })
    }
} 