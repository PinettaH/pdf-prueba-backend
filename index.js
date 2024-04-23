import express from "express";
import { router as userRouter } from './routes/users.js'
import { router as authRouter } from './routes/auth.js'
import { router as solicitudesRouter } from './routes/solicitudes.js'
import cors from 'cors';
const app = express();

//CORS
app.use(cors())

// Directorio Publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/solicitudes', solicitudesRouter)

app.listen(4000, () => {
    console.log('Server corriendo puerto: 4000')
});