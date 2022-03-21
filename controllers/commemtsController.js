const commentsModel = require("../models/commentsModel");
const usersModel = require("../models/usersModel");

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
        .find({postId: result.postId});  //lấy danh sách comment theo id bài viết
    const aaa = () => { // lấy thông tin user của từng comment
      return Promise.all(listCommentByIdPost.map(async (item) => {
        const infoUser = await usersModel.findOne({
          _id: item.userId
        })
        return {
          // _id: item._id,
          // postId: item.postId,
          // userId: item.userId,
          // content: item.content,
          // nameDisplay: infoUser.nameDisplay
          ...item._doc,
          nameDisplay: infoUser.nameDisplay
        }
      })) 
    } 

    
    return aaa().then(val => val);
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
