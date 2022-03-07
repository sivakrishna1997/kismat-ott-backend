"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userformatter = void 0;
const userformatter = (user) => {
    const ruser = {
        _id: user._id ? user._id : null,
        firstname: user.firstname ? user.firstname : null,
        lastname: user.lastname ? user.lastname : null,
        username: user.username ? user.username : null,
        email: user.email ? user.email : null,
        mobile: user.mobile ? user.mobile : null,
        role: user.role ? user.role : null,
        active: user.active ? user.active : null,
        cdate: user.cdate ? user.cdate : null,
        udate: user.udate ? user.udate : null,
    };
    return ruser;
};
exports.userformatter = userformatter;
//# sourceMappingURL=userformatter.js.map