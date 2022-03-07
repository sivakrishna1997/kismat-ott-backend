import mongoose from 'mongoose';

export default function mongodb() {
    const options: mongoose.ConnectOptions = {
        dbName: 'kismat',
        autoIndex: true
    }
    // let url = "mongodb://localhost:27017/kismat";
    let url = "mongodb+srv://tal:tal@cluster0.jmvgw.mongodb.net/kismat";
    mongoose.connect(url, options).then(
        response => {
            console.log('DB connected! "kismat"')
        }, err => {
            console.log(err)
        }
    )
}


