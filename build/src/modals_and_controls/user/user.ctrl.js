"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./user.schema");
const response_service_1 = require("../../service/response.service");
// const ObjectId = require('mongodb').ObjectId;
const mongodb_1 = require("mongodb");
const userformatter_1 = require("./userformatter");
const common_service_1 = __importDefault(require("../../service/common.service"));
const adduser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        user_schema_1.user.findOne({ email: params.email }).then((edoc) => {
            if (edoc) {
                (0, response_service_1.error)(req, res, 'Email already exist!', null);
            }
            else {
                user_schema_1.user.findOne({ username: params.username }).then((udoc) => __awaiter(void 0, void 0, void 0, function* () {
                    if (udoc) {
                        (0, response_service_1.error)(req, res, 'Username already exist!', null);
                    }
                    else {
                        params['cdate'] = Date.now();
                        params['udate'] = Date.now();
                        params['password'] = yield common_service_1.default.encriptPassword(req.body.password);
                        var inputdata = new user_schema_1.user(params);
                        inputdata.save().then((doc) => {
                            (0, response_service_1.success)(req, res, 'Registered Successfully!', (0, userformatter_1.userformatter)(doc));
                        }, (err) => {
                            (0, response_service_1.error)(req, res, 'Registration Failed!', err);
                        });
                    }
                }), err => {
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
});
const checkUserExistAndSaveAndGetUserWithToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        user_schema_1.user.findOne({ email: params.email }).then((edoc) => __awaiter(void 0, void 0, void 0, function* () {
            if (edoc) {
                sendUserWithToken(req, res, edoc, 'User Exist!');
            }
            else {
                params['cdate'] = Date.now();
                params['udate'] = Date.now();
                if (req.body.password) {
                    params['password'] = yield common_service_1.default.encriptPassword(req.body.password);
                }
                var inputdata = new user_schema_1.user(params);
                inputdata.save().then((doc) => {
                    sendUserWithToken(req, res, doc, 'User Added Successfully!');
                }, (err) => {
                    (0, response_service_1.error)(req, res, 'User Adding Failed!', err);
                });
            }
        }), err => {
            (0, response_service_1.error)(req, res, 'User Adding Failed!', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, 'User Adding Failed!', err);
    }
});
const userlogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        var query = {
            $or: [{
                    username: params.userId
                }, {
                    email: params.userId
                }]
        };
        user_schema_1.user.findOne(query).then((doc) => __awaiter(void 0, void 0, void 0, function* () {
            if (doc) {
                let passwordMatch = yield common_service_1.default.comparePassword(req.body.password, doc.password);
                if (!passwordMatch) {
                    (0, response_service_1.error)(req, res, "Password Doesn't Match!", "");
                    return null;
                }
                sendUserWithToken(req, res, doc, "Login Successfully");
            }
            else {
                (0, response_service_1.error)(req, res, "User Doesn't Exists", "");
            }
        }), err => {
            (0, response_service_1.error)(req, res, 'Login Failed!', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const sendUserWithToken = (req, res, doc, message) => __awaiter(void 0, void 0, void 0, function* () {
    let payload = {
        email: doc.email,
        id: doc._id,
    };
    let responseObj = {
        token: yield common_service_1.default.newToken(payload),
        user: (0, userformatter_1.userformatter)(doc)
    };
    console.log("res obj", responseObj);
    (0, response_service_1.success)(req, res, message, responseObj);
});
const getuser = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        params.email ? query['email'] = params.email : null;
        params.username ? query['username'] = params.username : null;
        params.mobile ? query['mobile'] = params.mobile : null;
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
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
        // role: 2
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
        params._id ? query['_id'] = new mongodb_1.ObjectId(`${params._id}`) : null;
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
const updatepassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        let query = { email: params.email };
        user_schema_1.user.findOne(query).then((doc) => __awaiter(void 0, void 0, void 0, function* () {
            if (doc) {
                let passwordMatch = yield common_service_1.default.comparePassword(req.body.password, doc.password);
                if (!passwordMatch) {
                    (0, response_service_1.error)(req, res, "Password Doesn't Match!", "");
                    return null;
                }
                params['password'] = yield common_service_1.default.encriptPassword(req.body.newPassword);
                user_schema_1.user.findOneAndUpdate(query, { $set: { password: params.password } })
                    .then((udoc) => {
                    if (udoc.n == 0) {
                        (0, response_service_1.error)(req, res, "Password updating failed ", "");
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
        }), err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
exports.default = {
    adduser,
    userlogin,
    getuser,
    getallusers,
    deleteuser,
    updatepassword,
    checkUserExistAndSaveAndGetUserWithToken
};
//# sourceMappingURL=user.ctrl.js.map