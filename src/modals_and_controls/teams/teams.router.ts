import * as express from 'express';
const root = express.Router();
import teamsCtrls from './teams.ctrl';

root.post('/create', teamsCtrls.createteams);
root.post('/get', teamsCtrls.getteams);
root.post('/delete', teamsCtrls.deleteteams);
root.post('/update', teamsCtrls.updateteams);
root.post('/deletetemp', teamsCtrls.deleteteamtemporary);
root.post('/addteammem', teamsCtrls.addteammembers);
root.post('/removeteammem', teamsCtrls.removeteammembers);
export default root;