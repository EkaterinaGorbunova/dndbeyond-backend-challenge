import { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  res.send('Welcome to the Hit Points API!');
});

export default router;
