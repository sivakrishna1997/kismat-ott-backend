import { teams } from './teams.schema';
import { Request, Response } from "express";
import { success, error } from '../../service/response.service';
// const ObjectId = require('mongodb').ObjectId;
import { ObjectId } from 'mongodb';
const createteams = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        teams.findOne({ name: params.name }).then(
            async (udoc) => {
                if (udoc) {
                    error(req, res, 'Teamname already exist!', null)
                } else {
                    params['cdate'] = Date.now();
                    params['udate'] = Date.now();

                    var inputdata = new teams(params)
                    inputdata.save().then(
                        (doc: any) => {
                            success(req, res, 'Team Created Successfully!', doc);
                        }, (err: any) => {
                            error(req, res, 'Creation Failed!', err);
                        }
                    )
                }
            }, err => {
                error(req, res, 'Creation Failed!', err)
            }
        )
    } catch (err) {
        error(req, res, 'Creation Failed!', err)
    }
}


const getteams = (req: Request, res: Response) => {
    try {
        let params = req.body;
        var query: any = {};
        // params.created_by ? query['created_by'] = params.created_by : null;
        params.created_by ? query.created_by = params.created_by : null;
        params.name ? query['name'] = params.name : null;
        // params.about ? query['about'] = params.about : null;
        // params.members ? query['members'] = params.members : null;
        // params.members ? query['members_email'] = params.members : null;
        // params.members.username ? query['members_username'] = params.members.username : null;

        teams.find(query).then(
            (doc: any) => {
                if (doc) {
                    success(req, res, "Team Details", doc);
                } else {
                    error(req, res, "Team Doesn't Exists!", "");
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}

const updateteams = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        teams.updateOne({
            _id: new ObjectId(`${params._id}`)
        },
            {
                $set: {
                    name: params.name,
                    about: params.about,
                    // // members: params.members
                    // members: [{
                    //     email: params.email,
                    //     username: params.username
                    // }]
                }
            }).then(
                (udoc: any) => {
                    if (udoc.n == 0) {
                        error(req, res, "Team updating failed ", "");
                    } else {
                        success(req, res, "Team updated successfully", udoc);
                    }
                }, err => {
                    error(req, res, '', err);
                }
            )
    }
    catch (err) {
        error(req, res, '', err);
    }
}

const deleteteams = (req: Request, res: Response) => {
    try {
        let params = req.body;
        let query: any = { _id: new ObjectId(`${params._id}`) };

        teams.deleteOne(query).then(
            (doc: any) => {
                if (doc.n == 0) {
                    error(req, res, "Team deleting failed", "");
                } else {
                    success(req, res, "Team deleted successfully", {});
                }
            }, err => {
                error(req, res, '', err)
            })
    } catch (err) {
        error(req, res, '', err)
    }
}
const deleteteamtemporary = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        teams.updateOne({
            // created_by: params.created_by,
            // created_by_email: params.created_by_email,
            // created_by_username: params.created_by_username,
            _id: new ObjectId(`${params._id}`)
        },
            {
                $set: {
                    active: false
                }
            }).then(
                (udoc: any) => {
                    if (udoc.n == 0) {
                        error(req, res, "Team deleting failed ", "");
                    } else {
                        success(req, res, "Team deleted successfully", udoc);
                    }
                }, err => {
                    error(req, res, '', err);
                }
            )
    }
    catch (err) {
        error(req, res, '', err);
    }
}


const addteammembers = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        teams.updateOne({
            // created_by_email: params.created_by_email,
            // created_by_username: params.created_by_username,
            _id: new ObjectId(`${params._id}`)
        }, {
            $push: {
                members: {
                    email: params.member.email,
                    username: params.member.username
                }
            }
        }).then(
            (udoc: any) => {
                if (udoc.n == 0) {
                    error(req, res, "Teammembers adding failed", "");
                } else {
                    success(req, res, "Teammembers added successfully", udoc);
                }
            }, err => {
                error(req, res, '', err);
            }
        )
    } catch (err) {
        error(req, res, 'Teammembers adding failed', err)
    }
}




const removeteammembers = async (req: Request, res: Response) => {
    try {
        let params = req.body;
        teams.updateOne({
            _id: new ObjectId(`${params._id}`)
        }, {
            $pull: {
                members: {
                    email: params.member.email
                }
            }
        }).then(
            (udoc: any) => {
                if (udoc.n == 0) {
                    error(req, res, "Teammembers removing failed", "");
                } else {
                    success(req, res, "Teammembers removed successfully", udoc);
                }
            }, err => {
                error(req, res, '', err);
            }
        )
    } catch (err) {
        error(req, res, 'Teammembers emoving failed', err)
    }
}



export default {
    createteams,
    getteams,
    deleteteams,
    updateteams,
    deleteteamtemporary,
    addteammembers,
    removeteammembers,
};

