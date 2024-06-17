import { checkSchema } from "express-validator";


export const createComment = checkSchema({
    content: {
        isString: {
            errorMessage: 'Content must be a string'
        },
        notEmpty: {
            errorMessage: 'Content cannot be empty'
        }
    },
    score: {
        isNumeric: {
            errorMessage: 'Score must be a number'
        }
    },
    'user.image.png': {
        isString: {
            errorMessage: 'png must be a string'
        }
    },
    'user.image.webp': {
        isString: {
            errorMessage: 'webp must be a string'
        }
    },
    'user.username': {
        isString: {
            errorMessage: 'Username must be a string'
        }
    },
    replies: {
        isArray: {
            errorMessage: 'Replies must be an array'
        }
    }
});

export const createReplies = checkSchema({
    content: {
        isString: {
            errorMessage: 'Content must be a string'
        },
        notEmpty: {
            errorMessage: 'Content cannot be empty'
        }
    },
    score: {
        isNumeric: {
            errorMessage: 'Score must be a number'
        }
    },
    'user.image.png': {
        isString: {
            errorMessage: 'png must be a string'
        }
    },
    'user.image.webp': {
        isString: {
            errorMessage: 'webp must be a string'
        }
    },
    'user.username': {
        isString: {
            errorMessage: 'Username must be a string'
        }
    },
    replyingTo: {
        isString: {
            errorMessage: 'replying to must be a string'
        }
    }
    
});


// Validation schema for comment ID in params
export const commentIdParam = checkSchema({
    commentId: {
        in: ['params'],
        isMongoId: {
            errorMessage: 'Invalid comment ID format'
        }
    }
});

export const replyIdParam = checkSchema({
    replyId: {
        in: ['params'],
        isMongoId: {
            errorMessage: 'Invalid comment ID format'
        }
    }
});

export const updateScore = checkSchema({
    score: {
        in: ['body'],
        isFloat: {
            options: { min: -Infinity, max: Infinity },
            errorMessage: 'Score must be a valid number'
        },
        toFloat: true
    }
})