const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
let centerSchema= new Schema({
    center_name: String,
    phone_number: String,
    coordinates: String,
    fk_id_address: Number
});
 
const centerModel = mongoose.model("centers", centerSchema);
module.exports = centerModel;