"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const payumoney = require('payumoney-pay');
payumoney.setAuthData(false, //mode
'FG3OlgqA', //key
'4X7sU8yLC9', //salt
'qNQxYqLlxsXbNx+6mvhA8Gx0MKI/4tJXypI1gb4/3LM=', //auth
'SURL', //success url
'FURL' // failure url
);
const makepayment = (req, res) => {
    const params = req.body;
    const txnid = (0, uuid_1.v4)();
    console.log("uuidv4()==>", txnid);
    const paymentreq = {
        amount: "10",
        firstname: "sivakrishna",
        email: "krishna88861@gmail.com",
        phone: "8886188297",
        txnid: txnid,
        productinfo: "testing",
        udf1: "...sasd"
    };
    payumoney.makePayment(paymentreq).then((doc) => {
        console.log(doc);
    }, (err) => {
        console.log("err=>", err);
    });
};
exports.default = { makepayment };
//# sourceMappingURL=payment.ctrl.js.map