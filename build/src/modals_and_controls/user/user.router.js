"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const user_ctrl_1 = __importDefault(require("./user.ctrl"));
const root = express.Router();
root.post('/register', user_ctrl_1.default.adduser);
root.post('/login', user_ctrl_1.default.userlogin);
root.post('/get', user_ctrl_1.default.getuser);
root.post('/getall', user_ctrl_1.default.getallusers);
root.post('/delete', user_ctrl_1.default.deleteuser);
root.post('/updatepassword', user_ctrl_1.default.updatepassword);
root.post('/check-user-exist-and-save-and-get-user-with-token', user_ctrl_1.default.checkUserExistAndSaveAndGetUserWithToken);
exports.default = root;
//# sourceMappingURL=user.router.js.map