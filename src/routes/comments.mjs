import { Router, request, response } from "express";
import { Comments } from "../mongoose/schemas/comments.mjs";
import { matchedData } from "express-validator";
import { validate } from "../middleware/validate.mjs";
import { createComment, updateScore } from "../utils/validateSchema.mjs";
import { commentIdParam } from "../utils/validateSchema.mjs";


const router = Router();


// fetch all comment data
router.get('/api/comment', async (request, response) => {
    try {
      const comments = await Comments.find(); // Await the result of the database query
      return response.status(200).json(comments); // Return the comments as JSON
    } catch (error) {
      console.error('Error fetching comments:', error);
      return response.status(500).json({ error: 'Internal Server Error' }); // Handle errors
    }
});


// post comment
router.post('/api/comment', createComment, validate, async (request, response) => {
  const data = matchedData(request)
  const newComment = new Comments(data);
  try {
   const savedUser = await newComment.save();
   return response.status(200).json(newComment) 
  } catch (error) {
    return response.status(500).send(`err: ${error}`)
  }
});


// patch comment
router.patch('/api/comment/:commentId', commentIdParam, validate, async (request, response) => {
  try {
    const commentId = request.params.commentId;
    const updateData = matchedData(request);

    const updatedComment = await Comments.findByIdAndUpdate(commentId, {$set: updateData}, {new: true, runValidators: true});

    if (!updatedComment) return response.status(404).send('comment not found');

    return response.status(200).send(updatedComment);

  } catch (error) {
    response.status(400).send(`Error updating comment: + ${error.message}`);
  }
})

// patch comment.score 
router.patch('/api/comment/:commentId/score', commentIdParam, updateScore, validate, async (request, response) => {
  const { score } = request.body;
  const { commentId } = request.params;

  try {
    const comment = await Comments.findById(commentId);
    if (!comment) return response.status(404)

    comment.score = (comment.score || 0) + score;
    await comment.save();

    return response.status(200).send(comment);
  } catch (error) {
    return response.status(500).send({ message: "internal error" })
  }
})


// delete comment 
router.delete('/api/comment/:commentId', commentIdParam, validate, async (request, response) => {
  const commentId = request.params.commentId;
  try {
    const deletedComment = await Comments.findByIdAndDelete(commentId);
    if (!deletedComment) return response.status(404).send('Comment not found');
    response.status(200).send('comment sucesfully deleted')
  } catch (error) {
    return response.status(500).send(`error: ${error}`)
  }
})


export default router
