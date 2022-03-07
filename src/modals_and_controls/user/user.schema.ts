import * as mongoose from 'mongoose';

export const user = mongoose.model('user', new mongoose.Schema({
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
})
)