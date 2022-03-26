const moment = require("moment")
const timeTablesModel = require("../models/timeTables");

const create = async (result) => {
    const dateNow = moment();
    result.dateEat = moment(result.dateEat, "DD/MM/YYYY");
    if(dateNow >= result.dateEat) {
        throw new Error("Date Eat less than or equal Date Now")
    }
    const getTimeTable = await timeTablesModel
        .find({ 
            userId: result.userId,
            dateEat: result.dateEat
    });
    if (getTimeTable) {
        throw new Error("Time Table already exist")
    }
    const insertedTimeTable = new timeTablesModel(result);
    await insertedTimeTable.save();
    return insertedTimeTable;
};
const getTimeTableByUserId = async (result) => {
    const getTimeTable = await timeTablesModel
        .find({ 
            userId: result.userId,
            dateEat: { $gte: moment() }
    });
    return getTimeTable;
};
const update = async (info) => {
    if (!info._id) {
        throw new Error("Update timetable don't have Id");
    }
    const updateTimeTable = await timeTablesModel.findOneAndUpdate({
        _id: info._id,
        userId: info.userId
    }, info, { new: true })
    if (updateTimeTable == null) {
        throw new Error("Update error");
    }
    return updateTimeTable
}
module.exports = { create, getTimeTableByUserId, update };
