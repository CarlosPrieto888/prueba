const express = require("express");
const router = express.Router();
const Peliculas = require("../models/peliculas");

//Función que devuelve todos los usuarios
router.get("/api/", async function(req, res){
    try{
        const peliresp = await Peliculas.find();
        res.json(peliresp);
    }catch(e){
        console.log("Error en la peticion get", e);
        res.status(400).send("Error en el servidor");
    }
})

router.post("/api/", async function(req, res){
    const {foto, titulo, genero, sinopsis, valoracion} = req.body

    try{
        const pelicula = {};

        pelicula.foto = foto;
        pelicula.titulo = titulo;
        pelicula.genero = genero;
        pelicula.sinopsis = sinopsis;
        pelicula.valoracion = valoracion;

        const peli = new Peliculas(pelicula);
        await peli.save();

        return res.send("Pelicula añadida correctamente")

    }catch(e){
        console.log("Error al añadir una pelicula", e);
        return  res.status(400).send("Error al añadir una pelicula");
    }

})

//Mirrar ¿Cómo buscar una sola pelicula bien?
router.put("/api/", async function(req, res){
    const titulo = req.body.titulo //Busacamos la pelicula por medio del titulo
    const {foto, genero, sinopsis, valoracion} = req.body
    //console.log(titulo + " " + genero + " " + sinopsis + " " + valoracion + " " + foto)
    try{
        const pelicula = await Peliculas.find({titulo:titulo});
        //console.log(pelicula)
        if(!pelicula){
            res.status(404).send("Error pelicula no encontrado")
        }else{
            pelicula.foto = foto || pelicula.foto
            pelicula.genero = genero || pelicula.genero
            pelicula.sinopsis = sinopsis || pelicula.sinopsis
            pelicula.valoracion = valoracion || pelicula.valoracion
            //console.log(pelicula.foto+" "+" "+pelicula.genero+" "+pelicula.sinopsis)
            // Guarda los cambios en la base de datos
            const updatedPelicula = await pelicula.save();
            return res.json(updatedPelicula);
        }
    }catch(e){
        return res.status(500).send("Error al cambiar algún dato de una pelicula")
    }

}) 

//Revisarlo 
router.delete("/api/", async function(req, res){
    const {foto, titulo, genero, sinopsis, valoracion} = req.body
    //console.log(titulo + " " + genero + " " + sinopsis + " " + valoracion + " " + foto)
    try{
        const pelicula = await Peliculas.findOneAndDelete({foto:foto, titulo:titulo, genero:genero, sinopsis:sinopsis, valoracion:valoracion});
        if(pelicula != null){
            return res.status(404).send("La pelicula no se ha encontrado en la base de datos")
        }else{
            return res.send("Pelicula eliminada correctamente")
        }
    }catch(e){
        return res.status(500).send("Error al eliminar la pelicula")
    }

})

module.exports = router