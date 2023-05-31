import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { routerHandler } from '@/router';
import { ApiError, NotFoundError } from '@/middleware';

export function startServer() {
  const app: express.Application = express();

  app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }));
  app.use(morgan('combined'));

  app.use('/api/v1', routerHandler);

  app.use((req: Request, res: Response, next: NextFunction) =>
    next(new NotFoundError(`path not found ${req.path}`))
  );

  app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.httpCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  });

  return app;
}

const PORT = process.env.PORT || 4000;

startServer().listen(PORT, () => {
  console.log('Node serveer is listening at url http://localhost: ' + PORT);
});
