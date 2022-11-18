const mongoose = require("../databases/mongo.js");
const AdminModel = require("../models/class.model.js");

const _admin = {
    showAll: async (req, res) => {
        await mongoose.conn();
        ClassModel.find({}, function(err, classes) {
            if (!err) { 
                res.render('all_classes.ejs', {allClasses: classes});
            }
            else {

                throw err;
            }
        });
        // mongoose.disconn();
    },
}

module.exports = _admin;