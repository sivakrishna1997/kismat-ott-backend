import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
const payumoney = require('payumoney-pay');
payumoney.setAuthData(
    false, //mode
    'FG3OlgqA', //key
    '4X7sU8yLC9',//salt
    'qNQxYqLlxsXbNx+6mvhA8Gx0MKI/4tJXypI1gb4/3LM=', //auth
    'SURL', //success url
    'FURL' // failure url
);


const makepayment = (req: Request, res: Response) => {
    const params = req.body;
    const txnid = uuidv4();
    console.log("uuidv4()==>", txnid)
    const paymentreq = {
        amount: "10",
        firstname: "sivakrishna",
        email: "krishna88861@gmail.com",
        phone: "8886188297",
        txnid: txnid,
        productinfo: "testing",
        udf1: "...sasd"
    }
    payumoney.makePayment(paymentreq).then(
        (doc: any) => {
            console.log(doc)
        }, (err: any) => {
            console.log("err=>", err)
        }
    );
}



export default { makepayment }