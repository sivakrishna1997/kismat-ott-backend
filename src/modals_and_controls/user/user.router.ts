import * as express from 'express';
import userCtrls from './user.ctrl';
const root = express.Router();

root.post('/register', userCtrls.adduser);
root.post('/login', userCtrls.userlogin);
root.post('/get', userCtrls.getuser);
root.post('/getall', userCtrls.getallusers);
root.post('/delete', userCtrls.deleteuser);
root.post('/updatepassword', userCtrls.updatepassword);
root.post('/check-user-exist-and-save-and-get-user-with-token', userCtrls.checkUserExistAndSaveAndGetUserWithToken);


export default root;