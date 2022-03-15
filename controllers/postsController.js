const postsModel = require("../models/postsModel");

const create = async (result) => {
  const insertedPost = new postsModel(result);
  await insertedPost.save();
  return insertedPost;
};

const getDetailPostById = async (result) => {
  if (!result.id) {
    throw new Error("Not id post");
  }
  const getPosts = await postsModel
    .findOne({_id: result.id})
  return getPosts;
}
const getListPostWithPage = async (result) => {
  if (!result.p || !result.s) {
    throw new Error("Not page or page size");
  }
  if (!result.t) {
    throw new Error("Not type post");
  }
  const getPosts = await postsModel
    .find({type: result.t})
    .skip((+result.p-1) * +result.s)
    .limit(+result.s);
  return getPosts;
};

const getListPostUserWithPage = async (result) => {
  if (!result.p || !result.s) {
    throw new Error("Not page or page size");
  }

  const getPostsUser = await postsModel
    .find({userId: result.userId})
    .skip((+result.p-1) * +result.s)
    .limit(+result.s);
  return getPostsUser;
};

const update = async (info) => {
  if(!info._id) {
    throw new Error("Update post don't have Id");
  }
  const updatePost = await postsModel.findOneAndUpdate({
    _id: info._id,
    userId: info.userId
  }, info, {new: true})
  if(updatePost == null) {
    throw new Error("Update error");
  }
  return updatePost
} 
module.exports = { create, getListPostWithPage, getListPostUserWithPage, getDetailPostById, update };
