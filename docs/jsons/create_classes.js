const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = "mongodb://127.0.0.1:27017/";
const express = require('express');
const app = express();
const mydb = "todo_musica";
const centers = "centers";
const classesDb = "classes";

function insertClassesToDB(classes){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var db = db.db(mydb);
        db.collection(classesDb).insert(classes,function(err, res) {
            if (err) throw err;
            console.log("Clases insertadas");
            db.close();
        });
    });
}

function createClassesByCenter(centers){
    var instruments = ["Guitarra","Piano","Clarinete","Violín","Percusión"];
    var schedule = ["Lunes y Miércoles - 12h a 14h","Lunes y Miércoles - 18h a 20h"];
    var objectIDCenters = centers.map(center => {
        return center._id.toString();
    });
    var classes = [];
    for(let i = 0; i<objectIDCenters.length; i++){
        for(let j = 0; j<schedule.length; j++){
            for(let k= 0; k<instruments.length; k++){
                var _class = {
                    "instrument":instruments[k],
                    "schedule": schedule[j],
                    "teacher": "",
                    "year": "2022",
                    "fk_id_center":objectIDCenters[i],
                    "students": []
                }
                classes.push(_class);
            }
        }
    }
    console.log(classes.length)
    insertClassesToDB(classes);
}

app.get('/get-classes', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        dbo.collection(centers).find({}).toArray(function(err, result) {
            if (err) throw err;
            createClassesByCenter(result);
            db.close();
            res.send("¡Clases insertadas!");
        })
    });
    
});

app.listen(5000);