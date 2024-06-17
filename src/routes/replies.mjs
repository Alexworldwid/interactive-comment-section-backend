import { Router, response } from "express";
import { Comments } from "../mongoose/schemas/comments.mjs";
import { commentIdParam, createReplies, replyIdParam, updateScore } from "../utils/validateSchema.mjs";
import { matchedData } from "express-validator";
import { validate } from "../middleware/validate.mjs";

const router = Router();


// post replies
router.post('/api/comment/:commentId/replies', createReplies, validate, async (request, response) => {
    const commentId = request.params.commentId;
    const data = matchedData(request);

    try {
        const comment = await Comments.findById(commentId);
        if (!comment) return response.status(404).send('comment not found');

        // @ts-ignore
        await comment.replies.push(data);
        // @ts-ignore
        await comment.save();
        return response.status(200).send(comment);
    } catch (error) {
        return response.status(500).send(`error: ${error}`)
    }

})

// patch replies
router.patch('/api/comment/:commentId/:replyId', commentIdParam, replyIdParam, validate, async (request, response) => {
    const commentId = request.params.commentId;
    const replyId = request.params.replyId;
    const { content } = matchedData(request);

    try {
        const comment = await Comments.findById(commentId);
        if (!comment) {
            return response.send('comment does not exist').status(404)
        }

        const reply = comment.replies.id(replyId);
        if (!reply) return response.status(404).send('reply does not exists');

        reply.content = content;

        await comment.save();
        return response.status(200).send({ message: 'Reply updated successfully', reply })
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error', details: error.message });
    }

});


// patch reply score 
router.patch('/api/comment/:commentId/:replyId/score', commentIdParam, replyIdParam, updateScore, validate, async (request, response) => {
    const { commentId, replyId } = request.params;
    const { score } = matchedData(request);

    try {
        const comment = await Comments.findById(commentId);
        if (!comment) return response.status(404).send({ message: "comment not found" });

        const reply = comment.replies.id(replyId);
        if (!reply) return response.status(404).send('reply does not exists');

        if (isNaN(score)) return response.status(400).send({ message: "invalid format" }); 

        reply.score = (reply.score || 0) + score;
        await comment.save();
        return response.status(200).send({ message: 'score updated successfully', reply })
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
})


// delete replies 
router.delete('/api/comment/:commentId/:replyId', commentIdParam, replyIdParam, validate, async (request, response) => {
    const { commentId, replyId } = request.params;

    try {
        const comment = await Comments.findById(commentId);
        if (!comment) return response.status(404).send({ message: "comment not found" });

        const replyIndex = comment.replies.findIndex(reply => reply._id?.toString() === replyId)
        if (replyIndex === -1) return response.status(404).send({ message: "reply not found" });

        comment.replies.splice(replyIndex, 1)
        await comment.save();

        return response.status(200).send({ message: "successfuly deleted the reply" })
    } catch (error) {
        return response.status(500).send({ message: "internal error", error })
    }
})


export default router