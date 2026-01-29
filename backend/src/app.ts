import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import prisma from './config/database';
import psychologistsRouter from "./routes/psychologists.routes";


const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/psychologists", psychologistsRouter);
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    
    res.json({ 
      status: 'OK', 
      message: 'Servidor y BD funcionando correctamente',
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Error conectando a la base de datos',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});


export default app;
