import express from 'express';
import { createPost, getPostBySlug, getUnApprovedPosts, HomePagePosts ,approvePost,getPostBySlugforadmin,rejectPost,getAllApprovedPosts,getPinnedPosts,togglePin,SearchPosts} from '../Controller/PostController.js';
import { isAuthenticatedUser,isAdmin } from '../middleware/Auth.js';
import singleupload from '../middleware/multer.js';

const router = express.Router()


router.route('/creatPost').post(isAuthenticatedUser,singleupload,createPost);
router.route('/UnApprovedPosts').get(isAdmin,getUnApprovedPosts);
router.route('/getHomePagePosts').get(HomePagePosts);
router.route('/getPostBySlug/:slug').get(getPostBySlug);
router.route('/getPostBySlugforadmin/:slug').get(isAdmin,getPostBySlugforadmin);
router.route('/approvePost/:id').post(approvePost);
router.route('/rejectPost/:id').delete(rejectPost);
router.route('/getAllApprovedPosts').get(getAllApprovedPosts);
router.route('/getPinnedPosts').get(getPinnedPosts);
router.route('/togglePin/:id').post(togglePin);
router.route('/getSearchPost').get(SearchPosts);




export default router;