import { Router } from 'express';
import usersRouter from './users.mjs'

const router = Router();

router.use('/users', usersRouter);

export default router;