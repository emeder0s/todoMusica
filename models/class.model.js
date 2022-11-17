const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
let classSchema= new Schema({
    instrument: String,
    year: String,
    teacher: String,
    schedule: String,
    fk_id_center: String,
    students: [String]  
});
 
const classModel = mongoose.model("classes", classSchema);
module.exports = classModel;