import * as mongoose from 'mongoose';

export const teams = mongoose.model('teams', new mongoose.Schema({
    created_by: {
        email: { type: String, required: true },
        username: { type: String, required: true },
    },
    name: { type: String, required: true },
    about: { type: String },
    members: [{
        email: { type: String },
        username: { type: String },
    }],
    active: { type: Boolean, default: true },
    cdate: { type: Date },
    udate: { type: Date }
})
)