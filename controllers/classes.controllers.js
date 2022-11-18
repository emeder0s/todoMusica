const mongoose = require("../databases/mongo.js");
var ObjectId = require('mongodb').ObjectId;
const ClassModel = require("../models/class.model.js");
const _center = require("../controllers/centers.controllers");

const _class = {

    /**
     * Devuelve todas las clases que hay en la DB
     * @param {*} req 
     * @param {*} res 
     */
    showAll: async (req, res) => {
        await mongoose.conn();
        ClassModel.find({}, function (err, classes) {
            if (!err) {
                res.render('all_classes.ejs', { allClasses: classes });
            }
            else {

                throw err;
            }
        });
        // mongoose.disconn();
    },

    /**
     * Devuelve las clases de un usuario, cuyo id se pasa en la URL. 
     * @param {*} req 
     * @param {*} res 
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
     * @param {*} req 
     * @param {*} res 
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
     * @param {*} req 
     * @param {*} res 
     */
    edit: async (req, res) => {
        await mongoose.conn();
        var _class = await ClassModel.findOne({ _id: new ObjectId(req.params.id) });
        if (_class) {
            //await ClassModel.findByIdAndUpdate(req.params.id,_class)
            console.log("hola");
        }
        res.json({});
    },

    /**
     * Añade el id del usuario al array students de una clase
     * @param {*} req 
     * @param {*} res 
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

    // getByCenterAndInstrument: async (req, res) => {
    //     // const { center, instrument } = req.body;
    //     await mongoose.conn();
    //     var center = await ClassModel.findOne({center_name:req.body.center});
    //     filter = {instrument:req.body.instrument, fk_id_center:center.}
    //     ClassModel.find(filter, function(err, classes) {
    //         if (!err) { 
    //             res.render('./all_classes.ejs', {allClasses: classes});
    //         }
    //         else {
    //             throw err;
    //         }
    //     });

    // filter = {fk_id_center}
    // await mongoose.conn();
    // ClassModel.find({students:req.params.id}, function(err, classes) {
    //     if (!err) { 
    //         res.render('./all_classes.ejs', {allClasses: classes});
    //     }
    //     else {
    //         throw err;
    //     }
    // });
    //mongoose.disconn();
}


module.exports = _class;