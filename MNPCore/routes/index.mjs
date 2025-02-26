import { Router } from 'express';
import usersRouter from './users.mjs'
import reserveRouter from './reserve.mjs'
import paymentRouter from './payment.mjs'
import livehouseRouter from './livehouse.mjs'
import facilitiesRouter from './facilities.mjs'

const router = Router();

router.use('/users', usersRouter);
router.use('/livehouse', livehouseRouter);
router.use('/reserve', reserveRouter);
router.use('/payment', paymentRouter);
router.use('/facilities', facilitiesRouter);

export default router;