const express = require("express");
const router = require("./routes/routes");
const port = 3000;
const app = express();
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "pug");
app.set("view engine", "ejs");
app.use(express.static("./views"));
app.use("/jsons", express.static("./docs/jsons"))
app.use("/img", express.static("./views/img"))
app.use("/", router);


app.listen(port, () => console.log(`Server ON: ${port}`));