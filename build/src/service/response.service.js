"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
const success = (req, res, msg, data) => {
    if (data) {
        res.json({
            status: 200,
            message: msg,
            data: data
        });
    }
    else {
        res.json({
            status: 300,
            message: msg,
        });
    }
};
exports.success = success;
const error = (req, res, msg, err) => {
    res.json({
        status: 500,
        message: (err === null || err === void 0 ? void 0 : err.message) ? err === null || err === void 0 ? void 0 : err.message : msg,
    });
};
exports.error = error;
//# sourceMappingURL=response.service.js.map