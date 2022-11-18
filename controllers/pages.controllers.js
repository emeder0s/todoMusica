const center = require("../controllers/centers.controllers");
const instrument = require("../controllers/instruments.controllers")

const pages = {
    home: (req, res) => {
    //   res.render("index");
    },

    startEnroll: async (req, res) => {
        var centers = await center.getAll();
        var instruments = ["Guitarra", "Piano", "Clarinete","Violín","Percusión"];
        res.render("./enroll.ejs",{centers, instruments});
      },
  };
  
  module.exports = pages;