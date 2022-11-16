const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
let adminSchema= new Schema({
    admin_name: String,
    admin_password: String, 
});
 
const adminModel = mongoose.model("administrators", adminSchema);
module.exports = adminModel;