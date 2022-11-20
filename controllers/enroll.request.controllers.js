const mongoose = require("../databases/mongo.js");
const enrollRequestModel = require("../models/enroll.request.model.js"); 
const classModel = require("../models/class.model.js"); 
const centerModel = require("../models/center.model.js"); 
const userModel = require("../models/user.model.js");
const userController = require("../controllers/users.controllers"); 
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const enrollRequest = {
    /**
     * Añade una solicitud de matriculación
     * @param {*} req 
     * @param {*} res 
     */
    add: async (req, res) => {
        var cookies = req.cookies;
        var token = cookies.infoJwt;
        let jwtVerify = jwt.verify(token, "m1c4s4")
        let email = jwtVerify.email; 
        await mongoose.conn();
        await enrollRequestModel.create({
            class_id: req.params.classId, 
            user_email:email,
            request_status: "pending"
          })
        res.json({})
    },

    /**
     * Devuelve todas las solicitudes de matriculación
     * @param {*} req 
     * @param {*} res 
     * @returns enrollRequets
     */
    getAll: async (req, res) => {
        await mongoose.conn();
        var enrollRequets = await enrollRequestModel.find({request_status:'pending'});
        var response =  await Promise.all(
            enrollRequets.map(async request => {
                var class_id = new ObjectId(request.class_id);
                var _class = await classModel.findOne({_id:class_id});
                var center_id = new ObjectId(_class.fk_id_center);
                var _center = await centerModel.findOne({_id:center_id});
                var user =  await userController.returnUserByEmail(request.user_email);
                console.log(user)
                var response = {
                    id_request: request._id.toString(),
                    user_email: request.user_email,
                    is_buyer: user.isbuyer,
                    request_status: request.request_status,
                    class_id: request.class_id,
                    instrument: _class.instrument,
                    schedule: _class.schedule,
                    teacher: _class.teacher,
                    year: _class.year,
                    center: _center.center_name,
                    students: _class.students,
                }
                return response;
            })
        );
        res.json(response);
    },
}

module.exports = enrollRequest;