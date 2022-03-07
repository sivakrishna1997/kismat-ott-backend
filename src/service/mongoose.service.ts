import mongoose from 'mongoose';

export default function mongodb() {
    const options: mongoose.ConnectOptions = {
        dbName: 'talktsy',
        autoIndex: true
    }
    let url = "mongodb://localhost:27017/talktsy";
    mongoose.connect(url, options).then(
        response => {
            console.log('DB connected! "talktsy"')
        }, err => {
            console.log(err)
        }
    )
}


