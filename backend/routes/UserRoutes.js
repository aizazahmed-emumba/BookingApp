import express from 'express';
import { registerUser,loginUser,logout,getUser,getAllUsers, getAdmin } from '../Controller/UserControllers.js';
import { isAuthenticatedUser,isAdmin } from '../middleware/Auth.js';
const router = express.Router()


router.route('/register').post(registerUser);

router.route('/login').post(loginUser);
router.route('/getProfile').get(isAuthenticatedUser,getUser);
router.route('/getAdminProfile').get(isAdmin,getAdmin);
router.route('/getUsers').get(isAdmin,getAllUsers);
router.route('/logout').post(logout);



export default router;