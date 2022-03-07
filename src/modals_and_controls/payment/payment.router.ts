import * as express from 'express';
import paymentCtrls from './payment.ctrl';
const root = express.Router();

root.post('/make', paymentCtrls.makepayment);


export default root;