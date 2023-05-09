const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Peliculas = new Schema({

    foto: { //Preguntar por si acaso ¿Cómo hacerlo?
        type: String,
        required: true,
    },

    titulo: {
        type: String,
        required: true,
        unique: true,
    },

    genero: {
        type: String,
        required: true,
    },

    sinopsis: {
        type: String,
        required: true,
    },

    //Mirar solo pueda ser hasta 10
    valoracion: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model("peliculas", Peliculas);
module.exports = Peliculas;