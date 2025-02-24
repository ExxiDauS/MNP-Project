import { Router } from 'express';
import usersRouter from './users.mjs'
import reserveRouter from './reserve.mjs'
import paymentRouter from './payment.mjs'
import livehouseRouter from './livehouse.mjs'

const router = Router();

router.use('/users', usersRouter);
router.use('/livehouse', livehouseRouter);
router.use('/reserve', reserveRouter);
router.use('/payment', paymentRouter);

export default router;