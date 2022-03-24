const removeSignature = require("../common/removeSignature");
const postsModel = require("../models/postsModel");

const create = async (result) => {
  result.titleAlias = removeSignature(result.title)
  const insertedPost = new postsModel(result);
  await insertedPost.save();
  return insertedPost;
};

const getListSearchWithPage = async (query) => {
  if (!query.k) {
    throw new Error("Not keyworđ");
  }
  if (!query.p || !query.s) {
    throw new Error("Not page or page size");
  }
  const getListSearch = await postsModel
    .find({titleAlias: { $regex: new RegExp(removeSignature(query.k), "ig") } })
    .skip((+query.p - 1) * +query.s)
    .limit(+query.s);
  return getListSearch;
}

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

const getListPostByListBookmark = async (result) => {
  if (!result.p || !result.s) {
    throw new Error("Not page or page size");
  }
  if (!result.bk) {
    throw new Error("Not List Bookmark");
  }
  const lstBookmart = result.bk.slice((result.p-1)*result.s, (result.p*result.s));
  const getPostsById = () => {
    return Promise.all(
      lstBookmart.map(async (item) => {
        const postItem = await postsModel.findOne({
          _id: item,
        });
        return postItem;
      })
    ).then((val) => val);
  };
  return getPostsById();
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

const likePost = async (info) => {
  const findPostByUserId = await postsModel.findOne({
    _id: info._id
  })
  const usersLike = findPostByUserId.usersLike.indexOf(info.userId);
  if(usersLike >= 0) {
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
module.exports = { create, getListSearchWithPage, getTopLike, getListPostWithPage, getListPostUserWithPage, getDetailPostById, update, likePost, getListPostByListBookmark };
