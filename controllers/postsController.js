const create = async (result) => {
    const insertedPost = new userModel(result);
    await insertedPost.save()
    return insertedPost
}
module.exports = { create }