const commentsModel = require("../models/commentsModel");

const create = async (result) => {
  const insertedComment = new commentsModel(result);
  await insertedComment.save();
  return insertedComment;
};

const getListCommentByIdPost = async (result) => {
    if(!result.postId) {
        throw new Error("Don't have Id post");
    }
    const listCommentByIdPost = await commentsModel
        .find({postId: result.postId});
    return listCommentByIdPost;
}

const update = async (info) => {
  if(!info._id) {
    throw new Error("Update comment don't have Id");
  }
  const updateComment = await commentsModel.findOneAndUpdate({
    _id: info._id,
    userId: info.userId,
    postId: info.postId
  }, info, {new: true})
  if(updateComment == null) {
    throw new Error("Update error");
  }
  return updateComment
} 
module.exports = { create, getListCommentByIdPost ,update };
