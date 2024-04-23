import { Post } from "../models/Post.js";
import  getDataUri  from "../utils/dataUri.js";
import cloudinary from 'cloudinary';
import asyncHadnler from 'express-async-handler'

export const getPosts = asyncHadnler(async (req, res) => {

    const posts = await Post.find({});

    res.json(posts);

})

export const getAllApprovedPosts = asyncHadnler(async (req, res) => {
    
        const posts = await Post.find({approved: true}).populate('user','name').select('-content');
    
        if (posts) {
            res.json(posts);
        } else {
            res.status(404);
            throw new Error('Post not found');
        }
    
})

export const approvePost = asyncHadnler(async (req, res) => {
    
        const post = await Post.findById(req.params.id);
    
        if(post){
            post.approved = true;
            await post.save();
            res.json(post);
        }else{
            res.status(404);
            throw new Error('Post not found');
        }
    
})

export const togglePin = asyncHadnler(async (req, res) => {
    
    const post = await Post.findById(req.params.id);

    if(post){
        post.pinned = !post.pinned;
        await post.save();
        res.json(post);
    }else{
        res.status(404);
        throw new Error('Post not found');
    }

})

export const getLatestPosts = asyncHadnler(async (req, res) => {

    const posts = await Post.find({}).sort({createdAt: -1}).limit(6);

    res.json(posts);

})


export const getPinnedPosts = asyncHadnler(async (req, res) => {

    const posts = await Post.find({pinned: true}).populate('user','name').select('-content').sort({createdAt: -1});

    res.json(posts);

})

export const rejectPost = asyncHadnler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    await Post.findByIdAndDelete(req.params.id)
    res.json({
        message:"Deleted"
    });
})

export const getUnApprovedPosts = asyncHadnler(async (req, res) => {

    const posts = await Post.find({approved: false}).populate('user','name').select('-content');

    res.json(posts);

})



export const getPostById = asyncHadnler(async (req, res) => {
    
        const post = await Post.findById(req.params.id);
    
        if (post) {
            res.json(post);
        } else {
            res.status(404);
            throw new Error('Post not found');
        }
    
    })

export const createPost = asyncHadnler(async (req, res) => {
    
        const { title, description, keywords, category, content} = req.body;

        if(!title || !description || !keywords || !category || !content ){
            res.status(400);
            throw new Error('Please fill all the fields');
        }

      

        if(!req.file){
            res.status(400);
            throw new Error('Please upload a Cover Photo');
        }

        

        const file = req.file;
        const fileUri =  getDataUri(file);
       

        const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
            transformation: [
              { quality: 'auto' },
              { fetch_format: 'auto', quality: 'auto' }
            ]
          });

        const post = await Post.create({
            title,
            description,
            poster: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            keywords,
            category,
            content,
            user: req.user._id,
            slug: title.replace(/\s+/g, '-').toLowerCase()
        })
    
        if (post) {
            res.status(201).json({
                sucsess: true,
                _id: post._id,
                title: post.title,
                description: post.description,
                poster: post.poster,
                keywords: post.keywords,
                category: post.category
            })
        } else {
            res.status(400);
            throw new Error('Invalid post data');
        }
    
    })

    export const getPostBySlug = asyncHadnler(async (req, res) => {

        const post = await Post.findOne({slug: req.params.slug}).populate('user','name');
        if (post) {
            if (post.approved) {

                const relatedPosts = await Post.find({category:post.category,approved:true}).select('-content -keywords -createdAt -updatedAt -pinned -approved -featured -user').sort({createdAt: -1}).limit(6);

                const posts = {
                    post,
                    relatedPosts
                }
            
                res.json(posts);
            }
            else{
                res.status(404);
                throw new Error('Post not found');
            }
        } else {
            res.status(404);
            throw new Error('Post not found');
        }
    })

    export const getPostBySlugforadmin = asyncHadnler(async (req, res) => {

        const post = await Post.findOne({slug: req.params.slug}).populate('user','name');
        if (post) {
            res.json(post);
        } else {
            res.status(404);
            throw new Error('Post not found');
        }
    })

    export const HomePagePosts = asyncHadnler(async (req, res) => {

        const Latestposts =  Post.find({approved: true,pinned: false}).select('-content -keywords -createdAt -updatedAt -pinned -approved -featured').sort({createdAt: -1}).limit(6).populate('user','name') ;
        const pinnedPosts =  Post.find({approved: true,pinned: true}).select('-content -keywords -createdAt -updatedAt -pinned -approved -featured -user')
        const  MostViewedPosts =  Post.find({approved: true}).select('-content -keywords -createdAt -updatedAt -pinned -approved -featured -user').sort({views: -1}).limit(2);
        const featuredPosts = Post.find({approved: true,featured: true}).select('-content -keywords -createdAt -updatedAt -pinned -approved -featured -user').sort({createdAt: -1}).limit(2);
        
        
       const values = await  Promise.all([Latestposts,pinnedPosts,MostViewedPosts,featuredPosts])


        const posts = {
            Latestposts: values[0],
            pinnedPosts: values[1],
            MostViewedPosts: values[2],
            featuredPosts: values[3]
        }

        res.json(posts);

    })


    export const SearchPosts = asyncHadnler(async (req, res) => {


        const { keyword, category } = req.query;
        const query = {};
      
        if (keyword !=="null"  && category !=="null" ) {
          query.$and = [
            { title: { $regex: keyword, $options: 'i' } },
            { category: category }
          ];
          
        } else if (keyword  !=="null" ) {
          query.title = { $regex: keyword, $options: 'i' };
        } else if (category !=="null" ) {
          query.category = category;
        }
          
          

          const posts = await Post.find(query)
            .select('-content -keywords -updatedAt -pinned -approved -featured -user')
            .sort({ createdAt: -1 })
            .limit(6);
          
            if(posts.length === 0){
                 res.status(400);
                 throw new Error('No posts found');
            } 

          res.json(posts);

    })