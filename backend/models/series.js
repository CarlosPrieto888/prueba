const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Series = new Schema({

    //Faltaria meter el atributo de la foto

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
    },

    director: {
        type: String,
        required: true,
    }

})

module.exports = mongoose.model("series", Series);
module.exports = Series;