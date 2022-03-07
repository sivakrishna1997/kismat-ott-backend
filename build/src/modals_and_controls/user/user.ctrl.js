"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./user.schema");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const response_service_1 = require("../../service/response.service");
const ObjectId = require('mongodb').ObjectId;
const userformatter_1 = require("./userformatter");
const adduser = (req, res) => {
    try {
        let params = req.body;
        user_schema_1.user.findOne({ email: params.email }).then((edoc) => {
            if (edoc) {
                (0, response_service_1.error)(req, res, 'Email already exist!', null);
            }
            else {
                user_schema_1.user.findOne({ username: params.username }).then((udoc) => {
                    if (udoc) {
                        (0, response_service_1.error)(req, res, 'Username already exist!', null);
                    }
                    else {
                        params['cdate'] = Date.now();
                        params['udate'] = Date.now();
                        params['password'] = bcrypt.hashSync(req.body.password, salt);
                        var inputdata = new user_schema_1.user(params);
                        inputdata.save().then((doc) => {
                            (0, response_service_1.success)(req, res, 'Registered Successfully!', (0, userformatter_1.userformatter)(doc));
                        }, (err) => {
                            (0, response_service_1.error)(req, res, 'Registration Failed!', err);
                        });
                    }
                }, err => {
                    (0, response_service_1.error)(req, res, 'Registration Failed!', err);
                });
            }
        }, err => {
            (0, response_service_1.error)(req, res, 'Registration Failed!', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, 'Registration Failed!', err);
    }
};
const userlogin = (req, res) => {
    try {
        let params = req.body;
        var query = {
            $or: [{
                    username: params.userId
                }, {
                    email: params.userId
                }]
        };
        user_schema_1.user.findOne(query).then((doc) => {
            if (doc) {
                let passwordMatch = bcrypt.compareSync(req.body.password, doc.password);
                if (!passwordMatch) {
                    (0, response_service_1.error)(req, res, "Password Doesn't Match!", "");
                    return null;
                }
                let payload = {
                    email: doc.email,
                    username: doc.username,
                    mobile: doc.mobile,
                };
                let token = jwt.sign(payload, process.env.JWTSECRET, {
                    expiresIn: 36000
                });
                let responseObj = {
                    token: 'Bearer ' + token,
                    user: (0, userformatter_1.userformatter)(doc)
                };
                (0, response_service_1.success)(req, res, "Login Successfully", responseObj);
            }
            else {
                (0, response_service_1.error)(req, res, "User Doesn't Exists", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, 'Login Failed!', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const getuser = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.email ? query['email'] = params.email : null;
        params.username ? query['username'] = params.username : null;
        params.mobile ? query['mobile'] = params.mobile : null;
        params._id ? query['_id'] = ObjectId(`${params._id}`) : null;
        user_schema_1.user.findOne(query, { password: 0 }).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "User Details", (0, userformatter_1.userformatter)(doc));
            }
            else {
                (0, response_service_1.error)(req, res, "User Doesn't Exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const getallusers = (req, res) => {
    try {
        var query = {
            role: 2
        };
        user_schema_1.user.find(query, { password: 0 }).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "User Details", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Users Doesn't Exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const deleteuser = (req, res) => {
    try {
        let params = req.body;
        let query = {};
        params.email ? query['email'] = params.email : null;
        params._id ? query['_id'] = ObjectId(`${params._id}`) : null;
        user_schema_1.user.deleteOne(query).then((doc) => {
            if (doc.n == 0) {
                (0, response_service_1.error)(req, res, "User deleting failed", "");
            }
            else {
                (0, response_service_1.success)(req, res, "User deleted successfully", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const updatepassword = (req, res) => {
    try {
        let params = req.body;
        let query = { email: params.email };
        user_schema_1.user.findOne(query).then((doc) => {
            if (doc) {
                let passwordMatch = bcrypt.compareSync(req.body.password, doc.password);
                if (!passwordMatch) {
                    (0, response_service_1.error)(req, res, "Password Doesn't Match!", "");
                    return null;
                }
                params['password'] = bcrypt.hashSync(req.body.newPassword, salt);
                user_schema_1.user.findOneAndUpdate(query, { $set: { password: params.password } })
                    .then((udoc) => {
                    if (udoc.n == 0) {
                        (0, response_service_1.error)(req, res, "Password updateing failed ", "");
                    }
                    else {
                        (0, response_service_1.success)(req, res, "Password updated successfully", (0, userformatter_1.userformatter)(udoc));
                    }
                }, err => {
                    (0, response_service_1.error)(req, res, '', err);
                });
            }
            else {
                (0, response_service_1.error)(req, res, "Users Doesn't Exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
exports.default = {
    adduser,
    userlogin,
    getuser,
    getallusers,
    deleteuser,
    updatepassword
};
//# sourceMappingURL=user.ctrl.js.map