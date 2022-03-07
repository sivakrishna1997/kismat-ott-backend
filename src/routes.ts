import * as express from 'express';
const router = express.Router();

import userroutes from './modals_and_controls/user/user.router';
import paymentroutes from './modals_and_controls/payment/payment.router';
import teamsroutes from './modals_and_controls/teams/teams.router';
// const passport = require("passport")
// const authenticate = passport.authenticate('jwt', { session: false })

router.use('/user', userroutes);
router.use("/teams", teamsroutes);
// router.use('/payment', paymentroutes);


// routes.use('/material', authenticate, materialrouts);



export default router;