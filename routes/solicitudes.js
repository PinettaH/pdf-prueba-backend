import express, { Router } from 'express';
import { crearSolicitud, fetchSolicitudes, fetchSolicitudesByDni } from '../controllers/solicitudes.js';
export const router = Router();


router.post('/', crearSolicitud)

router.get('/solicitudes', fetchSolicitudes)

router.get('/solicitudes/:dni', fetchSolicitudesByDni)