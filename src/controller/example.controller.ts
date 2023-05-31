import { Request, Response } from 'express';

function example(req: Request, res: Response) {
  res.status(200).send({ message: 'Your api is working successfully' });
}

export { example };
