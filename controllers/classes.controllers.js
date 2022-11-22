const mongoose = require("../databases/mongo.js");
var ObjectId = require('mongodb').ObjectId;
const ClassModel = require("../models/class.model.js");
const CenterModel = require("../models/center.model.js");
const _center = require("../controllers/centers.controllers");
const _user = require("../controllers/users.controllers");
const jwt = require("jsonwebtoken");

const _class = {

    /**
     * Devuelve todas las clases que hay en la DB
     * @param {json} req 
     * @param {json} res 
     */
    showAll: async (req, res) => {
        await mongoose.conn();
        ClassModel.find({}, function (err, classes) {
            if (!err) {
                res.json({ classes });
            }
            else {
                throw err;
            }
        });
        // mongoose.disconn();
    },

    /**
     * Devuelve las clases de un usuario, cuyo id se pasa en la URL. 
     * @param {json} req 
     * @param {json} res 
     */
    showByUser: async (req, res) => {
        await mongoose.conn();
        ClassModel.find({ students: req.params.id }, function (err, classes) {
            if (!err) {
                res.render('./all_classes.ejs', { allClasses: classes });
            }
            else {
                throw err;
            }
        });
        //mongoose.disconn();
    },

    /**
     * Devuelve todas las clases agrupadas por centros
     * @param {json} req 
     * @param {json} res 
     */
    showByCenter: async (req, res) => {
        //el Object.entries se utiliza para convertirlo en iterable
        var centers = Object.values(await _center.getAll());
        var classes = await Promise.all(centers.map(async (center) => {
            var id = center._id.toString();
            var classes = await ClassModel.find({ fk_id_center: id });
            var element = { center, classes }

            return element;
        }))
        res.json({ classes });
    },

    /**
     * Edita una clase
     * @param {json} req 
     * @param {json} res 
     */
    edit: async (req, res) => {
        await mongoose.conn();
        var _class = await ClassModel.findOne({ _id: new ObjectId(req.params.id) });
        if (_class) {
            //await ClassModel.findByIdAndUpdate(req.params.id,_class)
        }
        res.json({});
    },

    /**
     * Añade el id del usuario al array students de una clase
     * @param {json} req 
     * @param {json} res 
     */
    enroll: async (req, res) => {
        await mongoose.conn();
        var _class = await ClassModel.findOne({ _id: new ObjectId(req.params.idClass) });
        if (_class.students.length < 4) {
            _class.students.push(req.params.idUser);
            await ClassModel.findByIdAndUpdate(req.params.idClass, _class)
        }
        res.json({});
    },

    /**
     * 
     * @param {json} req 
     * @param {json} res 
     */
    getByCenterAndInstrument: async (req, res) => {
        await mongoose.conn();
        var center = await CenterModel.findOne({center_name:req.body.center});
        var classes = await ClassModel.find({instrument:req.body.instrument, fk_id_center:center._id.toString()});
        res.render('./enroll_classes.ejs', {classes});
        //mongoose.disconn();
    },
    /**
     * 
     * @param {string} token 
     * @returns {json} 
     */
    getByUser: async (token) => {
            let jwtVerify = jwt.verify(token, "m1c4s4")
            let email = jwtVerify.email; 
            var user =   await _user.returnUserByEmail(email);
            var user_id = user.dataValues.id;
            var filter = {students:user_id.toString()};
            await mongoose.conn();
            var classes = await ClassModel.find(filter);

            return classes;
        //  mongoose.disconn();
    }
}


module.exports = _class;