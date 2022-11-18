const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
let enrollRequestSchema= new Schema({
    class_id: String,
    user_email: String,
    request_status:String
});
 
const enrollRequestModel = mongoose.model("enroll_requests", enrollRequestSchema);
module.exports = enrollRequestModel;