import { Router } from 'express';
import usersRouter from './users.mjs'
import calendarRouter from './calendar.mjs'
import reserveRouter from './reserve.mjs'
import paymentRouter from './payment.mjs'

const router = Router();

router.use('/users', usersRouter);
router.use('/calendar', calendarRouter);
router.use('/reserve', reserveRouter);
router.use('/payment', paymentRouter);

export default router;