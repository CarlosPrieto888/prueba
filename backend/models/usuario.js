const mongoose = require("mongoose");
const series = require("./series");
const peliculas = require("./peliculas");
const Schema = mongoose.Schema;

let Users = new Schema({

    nombre: {
        type: String,
        required: true,
    },

    apellido: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    telefono: {
        type: String,
        required: true,
    },

    contrasena: {
        type: String,
        required: true,
    },

    //Hacemos la listas de las peliculas y series 
    series:[series],
    peliculas:[peliculas]
})

module.exports = mongoose.model("users", Users);
