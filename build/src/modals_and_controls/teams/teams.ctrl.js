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
Object.defineProperty(exports, "__esModule", { value: true });
const teams_schema_1 = require("./teams.schema");
const response_service_1 = require("../../service/response.service");
// const ObjectId = require('mongodb').ObjectId;
const mongodb_1 = require("mongodb");
const createteams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        teams_schema_1.teams.findOne({ name: params.name }).then((udoc) => __awaiter(void 0, void 0, void 0, function* () {
            if (udoc) {
                (0, response_service_1.error)(req, res, 'Teamname already exist!', null);
            }
            else {
                params['cdate'] = Date.now();
                params['udate'] = Date.now();
                var inputdata = new teams_schema_1.teams(params);
                inputdata.save().then((doc) => {
                    (0, response_service_1.success)(req, res, 'Team Created Successfully!', doc);
                }, (err) => {
                    (0, response_service_1.error)(req, res, 'Creation Failed!', err);
                });
            }
        }), err => {
            (0, response_service_1.error)(req, res, 'Creation Failed!', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, 'Creation Failed!', err);
    }
});
const getteams = (req, res) => {
    try {
        let params = req.body;
        var query = {};
        // params.created_by ? query['created_by'] = params.created_by : null;
        params.created_by ? query.created_by = params.created_by : null;
        params.name ? query['name'] = params.name : null;
        // params.about ? query['about'] = params.about : null;
        // params.members ? query['members'] = params.members : null;
        // params.members ? query['members_email'] = params.members : null;
        // params.members.username ? query['members_username'] = params.members.username : null;
        teams_schema_1.teams.find(query).then((doc) => {
            if (doc) {
                (0, response_service_1.success)(req, res, "Team Details", doc);
            }
            else {
                (0, response_service_1.error)(req, res, "Team Doesn't Exists!", "");
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const updateteams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        teams_schema_1.teams.updateOne({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: {
                name: params.name,
                about: params.about,
                // // members: params.members
                // members: [{
                //     email: params.email,
                //     username: params.username
                // }]
            }
        }).then((udoc) => {
            if (udoc.n == 0) {
                (0, response_service_1.error)(req, res, "Team updating failed ", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Team updated successfully", udoc);
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const deleteteams = (req, res) => {
    try {
        let params = req.body;
        let query = { _id: new mongodb_1.ObjectId(`${params._id}`) };
        teams_schema_1.teams.deleteOne(query).then((doc) => {
            if (doc.n == 0) {
                (0, response_service_1.error)(req, res, "Team deleting failed", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Team deleted successfully", {});
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
};
const deleteteamtemporary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        teams_schema_1.teams.updateOne({
            // created_by: params.created_by,
            // created_by_email: params.created_by_email,
            // created_by_username: params.created_by_username,
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $set: {
                active: false
            }
        }).then((udoc) => {
            if (udoc.n == 0) {
                (0, response_service_1.error)(req, res, "Team deleting failed ", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Team deleted successfully", udoc);
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, '', err);
    }
});
const addteammembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        teams_schema_1.teams.updateOne({
            // created_by_email: params.created_by_email,
            // created_by_username: params.created_by_username,
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $push: {
                members: {
                    email: params.member.email,
                    username: params.member.username
                }
            }
        }).then((udoc) => {
            if (udoc.n == 0) {
                (0, response_service_1.error)(req, res, "Teammembers adding failed", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Teammembers added successfully", udoc);
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, 'Teammembers adding failed', err);
    }
});
const removeteammembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = req.body;
        teams_schema_1.teams.updateOne({
            _id: new mongodb_1.ObjectId(`${params._id}`)
        }, {
            $pull: {
                members: {
                    email: params.member.email
                }
            }
        }).then((udoc) => {
            if (udoc.n == 0) {
                (0, response_service_1.error)(req, res, "Teammembers removing failed", "");
            }
            else {
                (0, response_service_1.success)(req, res, "Teammembers removed successfully", udoc);
            }
        }, err => {
            (0, response_service_1.error)(req, res, '', err);
        });
    }
    catch (err) {
        (0, response_service_1.error)(req, res, 'Teammembers emoving failed', err);
    }
});
exports.default = {
    createteams,
    getteams,
    deleteteams,
    updateteams,
    deleteteamtemporary,
    addteammembers,
    removeteammembers,
};
//# sourceMappingURL=teams.ctrl.js.map