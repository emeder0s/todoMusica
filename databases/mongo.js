const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/todo_musica";


const connect = async function conn() {
    try {
        console.log("contectados to dB");
        await mongoose.connect(url);
    } catch (error) {
        console.error(error);
    }
}

const connection =  {
    conn: connect(),
    disconn: mongoose.disconnect()
}
    
module.exports = connection;