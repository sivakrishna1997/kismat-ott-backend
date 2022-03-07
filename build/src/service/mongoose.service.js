"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function mongodb() {
    const options = {
        dbName: 'talktsy',
        autoIndex: true
    };
    let url = "mongodb://localhost:27017/talktsy";
    mongoose_1.default.connect(url, options).then(response => {
        console.log('DB connected! "talktsy"');
    }, err => {
        console.log(err);
    });
}
exports.default = mongodb;
//# sourceMappingURL=mongoose.service.js.map