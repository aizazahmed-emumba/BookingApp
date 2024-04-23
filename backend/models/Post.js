import mongoose from 'mongoose';


const schema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    poster: 
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ,

    keywords:[
        {
            type: String,
            required: true      
        }
    ],

    category: [{
        type: String,
        required: true
    }],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    content:{
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    pinned: {
        type: Boolean,
        default: false
    },

    approved: {
        type: Boolean,
        default: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    
}, {
    timestamps: true
})

export const Post = mongoose.model('Post', schema);





