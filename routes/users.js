import express, { Router } from 'express';
import { obtenerUsuarios } from '../controllers/users.js';
export const router = Router();

router.get('/', obtenerUsuarios)