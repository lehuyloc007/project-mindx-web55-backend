const postsModel = require("../models/postsModel");

const create = async (result) => {
  const insertedPost = new postsModel(result);
  await insertedPost.save();
  return insertedPost;
};

const getTopLike = async () => {
  const getPosts = await postsModel
    .find()
    .sort({usersLike: -1})
    .limit(3);
  return getPosts;
}
const getDetailPostById = async (result) => {
  if (!result.id) {
    throw new Error("Not id post");
  }
  const getPosts = await postsModel.findOne({ _id: result.id });
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
    .find({ type: result.t })
    .skip((+result.p - 1) * +result.s)
    .limit(+result.s);
  return getPosts;
};

const getListPostUserWithPage = async (result) => {
  if (!result.p || !result.s) {
    throw new Error("Not page or page size");
  }

  const getPostsUser = await postsModel
    .find({ userId: result.userId })
    .skip((+result.p - 1) * +result.s)
    .limit(+result.s);
  return getPostsUser;
};

const update = async (info) => {
  if (!info._id) {
    throw new Error("Update post don't have Id");
  }
  const dataUpdate = {
    title: info.title,
    description: info.description,
    content: info.content,
    avatar: info.avatar,
    type: info.type,
    ingredients: info.ingredients,
    totalCalories: info.totalCalories
  }
  const updatePost = await postsModel.findOneAndUpdate({
    _id: info._id,
    userId: info.userId
  }, dataUpdate, { new: true })

  if (updatePost == null) {
    throw new Error("Update error");
  }
  return updatePost
}

const likePost = (info) => {
  const findPostByUserId = await postsModel.findOne({
    _id: info._id
  })
  const usersLike = findPostByUserId.usersLike.indexOf(info.userId);
  if(usersLike) {
    findPostByUserId.usersLike.splice(usersLike, 1)
  } else {
    findPostByUserId.usersLike.push(info.userId)
  }
  const updatePost = await postsModel.findOneAndUpdate({
    _id: info._id
  }, {usersLike: findPostByUserId.usersLike}, { new: true })

  if (updatePost == null) {
    throw new Error("Update error");
  }
  return updatePost.usersLike
}
module.exports = { create, getTopLike, getListPostWithPage, getListPostUserWithPage, getDetailPostById, update, likePost };
