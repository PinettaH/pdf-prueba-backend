import express, { Router } from 'express';
import { crearSolicitud, fetchSolicitudes, fetchSolicitudesByDni, updateEstadoSolicitud } from '../controllers/solicitudes.js';
export const router = Router();


router.post('/', crearSolicitud)

router.get('/solicitudes', fetchSolicitudes)

router.get('/solicitudes/:dni', fetchSolicitudesByDni)

router.put('/solicitudes/:idsolicitudes', updateEstadoSolicitud)