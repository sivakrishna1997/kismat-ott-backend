import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
const path = require('path');
import mongodb from './service/mongoose.service'
import router from "./routes";
dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();
mongodb();

app.use(helmet({ contentSecurityPolicy: false }));

app.use(cors());
// app.options('*', cors);
// var allowCrossDomain = function (req: Request, res: Response, next: NextFunction) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }
// app.use(allowCrossDomain);

app.use(express.json());

//routes
app.use('/api', router);

app.use(express.static(path.join(__dirname, '../public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

