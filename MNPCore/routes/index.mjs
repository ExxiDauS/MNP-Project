import { Router } from 'express';
import usersRouter from './users.mjs'
import calendarRouter from './calendar.mjs'

const router = Router();

router.use('/users', usersRouter);
router.use('/calendar', calendarRouter);

export default router;