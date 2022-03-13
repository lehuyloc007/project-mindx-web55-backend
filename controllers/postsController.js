const postsModel = require("../models/postsModel");

const create = async (result) => {
  const insertedPost = new postsModel(result);
  await insertedPost.save();
  return insertedPost;
};
const getListPostWithPage = async (result) => {
  if (!result.p || !result.s) {
    throw new Error("Not page or page size");
  }
  const getPosts = await postsModel
    .find()
    .skip( (+result.p-1) * +result.s)
    .limit(+result.s);
  return getPosts;
};
module.exports = { create, getListPostWithPage };
