import mongoose from "mongoose";



const replySchema = new mongoose.Schema({
    content: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    score: {
        type: mongoose.Schema.Types.Number,
        default: 0
    }, 

    user: {
        username: {
            type: mongoose.Schema.Types.String,
            required: true
        }, 
        image: {
            png: {
                type: mongoose.Schema.Types.String,
                required: true
            },
            webp: {
                type: mongoose.Schema.Types.String,
                required: true
            }
        }
    },

    replyingTo: {
        type: mongoose.Schema.Types.String,
        required: true
    }
    
}, { timestamps: true })


const commentSchema = new mongoose.Schema({
    content: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    score: mongoose.Schema.Types.Number,

    user: {
        username: {
            type: mongoose.Schema.Types.String,
            required: true
        }, 
        image: {
            png: {
                type: mongoose.Schema.Types.String,
                required: true
            },
            webp: {
                type: mongoose.Schema.Types.String,
                required: true
            }
        }
    },

    replies: [replySchema]
}, { timestamps: true });


export const Comments = mongoose.model("Comments", commentSchema);