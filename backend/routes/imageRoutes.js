import express from 'express';
import { deleteImgeCloudinary } from '../Controller/ImageController.js';
import { isAuthenticatedUser,isAdmin } from '../middleware/Auth.js';
const router = express.Router()
router.route('/deleteImg').delete(isAuthenticatedUser,deleteImgeCloudinary);
export default router;