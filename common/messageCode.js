const messageCode = (type, message) => {
    return {
        messageCode: type == 0 ? 0 : 1,
        message: type == 0 ? 'success' : 'error',
        data: message 
    }
}
module.exports = messageCode;