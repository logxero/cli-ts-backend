import { NextFunction, Request, Response } from 'express';

type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const tryCatchWrapper =
  (fn: MiddlewareFunction): MiddlewareFunction =>
  (req: Request, res: Response, next: NextFunction): Promise<void> =>
    Promise.resolve(fn(req, res, next)).catch(next);
