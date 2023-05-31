import express, { Router } from 'express';
import { tryCatchWrapper } from '@/middleware';
import { example } from '@/controller';

export function routerHandler(): Router {
  const router = express.Router();
  router.get('/', tryCatchWrapper(example));

  return router;
}
