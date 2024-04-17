import express, { Router } from 'express';
import { loginUsuario } from '../controllers/auth.js';
export const router = Router();


router.post('/login', loginUsuario)