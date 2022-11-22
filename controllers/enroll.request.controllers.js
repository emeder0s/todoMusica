const mongoose = require("../databases/mongo.js");
const enrollRequestModel = require("../models/enroll.request.model.js"); 
const classModel = require("../models/class.model.js"); 
const centerModel = require("../models/center.model.js"); 
const userModel = require("../models/user.model.js");
const userController = require("../controllers/users.controllers"); 
const emailController = require("../controllers/email.controllers");
const pageController = require("../controllers/pages.controllers"); 
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const pages = require("./pages.controllers.js");

const enrollRequest = {
    /**
     * Añade una solicitud de matriculación
     * @param {json} req 
     * @param {json} res 
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
        pageController.sentEnrollRequest(req,res);
    },

    /**
     * Devuelve todas las solicitudes de matriculación
     * @param {json} req 
     * @param {json} res 
     * @returns {json}}
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
    
    /**
     * Cambia el estado de la solicitud (aceptado o rechazado)
     * Busca la clase y el centro en el que se imparte y llama a las funciones de enviar email de petición aceptada o rechadaza dependiendo del estado de la solicitud.
     * @param {json} req 
     * @param {json} res 
     */
    sendRequest:async (req, res) => {
        await mongoose.conn();
        var request_id = new ObjectId(req.query.request_id);
        var _request = await enrollRequestModel.findOneAndUpdate({_id:request_id}, {request_status:req.query.request_status})
        var class_id = new ObjectId(_request.class_id);
        var _class = await classModel.findOne({_id:class_id});
        var center_id = new ObjectId(_class.fk_id_center);
        var _center = await centerModel.findOne({_id:center_id}); 

        if (req.query.request_status = "accepted"){
            emailController.enrollRequestAccepted(req.query.user_email,_class,_center);
        }else{
            emailController.enrollRequestRejected(req.query.user_email,_class,_center);
        }

        res.json({request_id:req.query.request_id});
    }

}

module.exports = enrollRequest;