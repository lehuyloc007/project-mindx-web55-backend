const timeTablesModel = require("../models/timeTables");

const create = async (result) => {
    const hasTimeTable = await timeTablesModel
        .findOne({ userId: result.userId });
    if (hasTimeTable) {
        throw new Error("TimeTable already exist");
    }
    const insertedTimeTable = new timeTablesModel(result);
    await insertedTimeTable.save();
    return insertedTimeTable;
};
const getTimeTableByUserId = async (result) => {
    const getTimeTable = await timeTablesModel
        .findOne({ userId: result.userId });
    return getTimeTable;
};
const update = async (info) => {
    if (!info._id) {
        throw new Error("Update timetable don't have Id");
    }
    const updateTimeTable = await timeTablesModel.findOneAndUpdate({
        userId: info.userId
    }, info, { new: true })
    if (updateTimeTable == null) {
        throw new Error("Update error");
    }
    return updateTimeTable
}
module.exports = { create, getTimeTableByUserId, update };
