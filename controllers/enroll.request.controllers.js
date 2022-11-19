const mongoose = require("../databases/mongo.js");
const enrollRequestModel = require("../models/enroll.request.model.js"); 
const jwt = require("jsonwebtoken");

const enrollRequest = {
    add: async (req, res) => {
        var cookies = req.cookies;
        var token = cookies.infoJwt;
        console.log(token);
        console.log(req.params.classId);
        let jwtVerify = jwt.verify(token, "m1c4s4")
        let email = jwtVerify.email; 
        await mongoose.conn();
        await enrollRequestModel.create({
            class_id: req.params.classId, 
            user_email:email,
            request_status: "pending"
          })
        res.json({})
    }   
}

module.exports = enrollRequest;