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
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose = __importStar(require("mongoose"));
exports.user = mongoose.model('user', new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    mobile: { type: String },
    // role: { type: Number, required: true, enum: [1, 2, 3], default: 2 }, // 1 for admin , 2 for user, 3 for third party
    terms_conditions: { type: Boolean, default: false },
    provider: { type: String, default: '' },
    photo_url: { type: String },
    uid: { type: String },
    email_verified: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    cdate: { type: Date },
    udate: { type: Date }
}));
//# sourceMappingURL=user.schema.js.map