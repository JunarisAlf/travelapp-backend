
module.exports = (code = 500, success= false, message= "internal server error", data = null) => {
    return{code, success, message, data}
}
