const mongoose = require("../databases/mongo.js");
const ClassModel = require("../models/class.model.js"); // no habría que poner lo exportado??? Me daba error

const _class = {
    showAll: (req, res) => {
       mongoose.conn;
        ClassModel.find({}, function(err, classes) {
            if (!err) { 
                console.log(classes);
                mongoose.disconn;
            }
            else {
                throw err;
            }
        });
        
    
    }
}

module.exports = _class;