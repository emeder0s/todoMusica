const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/todo_musica";


const connect = async function conn() {
    mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Base de datos de Mongo conectada");
    })
    .catch((err) => {
        console.error(err);
    });
}

const disconnect = async function disconn() {
    await mongoose.disconnect()
    .then(() => {
        console.log("Base de datos de Mongo desconectada");
    })
    .catch((err) => {
        console.error(err);
    });
}

const connection = {
    conn: connect,
    disconn: disconnect
}

    
module.exports = connection;