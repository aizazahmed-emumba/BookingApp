import cloudinary from 'cloudinary';
import asyncHadnler from 'express-async-handler'


export const deleteImgeCloudinary = asyncHadnler(async (req, res) => {

    const { public_id } = req.body;

    const deleted = await cloudinary.v2.uploader.destroy(public_id);
    if(deleted)
    res.json({message:'Image deleted'});
    else{
        res.status(400);
        throw new Error('Image not deleted');
    }

})