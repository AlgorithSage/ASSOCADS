import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import contentRouter from './routes_api/contentRouter.ts';
import membershipRouter from './routes_api/membershipRouter.ts';
import contactRouter from './routes_api/contactRouter.ts';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[ASSOCADS-API] ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    runtime: 'Node.js + TypeScript (tsx)',
    service: 'Association for AI and Data Science (ASSOCADS) API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Route registration
app.use('/api/content', contentRouter);
app.use('/api/membership', membershipRouter);
app.use('/api/contact', contactRouter);

// Root fallback
app.get('/', (req: Request, res: Response) => {
  res.send('ASSOCADS TypeScript Backend API Service is active. Access /api/health or /api/content/overview.');
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`=======================================================`);
  console.log(` ASSOCADS TYPESCRIPT BACKEND API SERVICE IS RUNNING`);
  console.log(` Listening on: http://127.0.0.1:${PORT}`);
  console.log(` Health Check: http://127.0.0.1:${PORT}/api/health`);
  console.log(` Content API: http://127.0.0.1:${PORT}/api/content/overview`);
  console.log(`=======================================================`);
});
