import express, { Router } from 'express';
import { crearSolicitud, crearSolicitudFaltaConAviso, fetchSolicitudes, fetchSolicitudesByDni, updateEstadoSolicitud } from '../controllers/solicitudes.js';
export const router = Router();


router.post('/', crearSolicitud)

router.post('/falta-con-aviso/:dni', crearSolicitudFaltaConAviso)

router.get('/solicitudes', fetchSolicitudes)

router.get('/solicitudes/:dni', fetchSolicitudesByDni)

router.put('/solicitudes/:idsolicitudes', updateEstadoSolicitud)