const express = require("express");
const router = express.Router();
const User = require("../models/usuario");

//Función que devuelve todos los usuarios
router.get("/api/", async function(req, res){
    try{
        const useresp = await User.find();
        res.json(useresp);
    }catch(e){
        console.log("Error en la peticion get", e);
        res.status(400).send("Error en el servidor");
    }
})

router.post("/api/", async function(req, res){
    const {nombre, apellido, email, telefono, contrasena} = req.body

    try{
        const usuario = {};

        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.email = email;
        usuario.telefono = telefono;
        usuario.contrasena = contrasena;

        const user = new User(usuario);
        await user.save();

        return res.send("Usuario añadido correctamente")

    }catch(e){
        console.log("Error al añadir un usuario", e);
        return  res.status(400).send("Error al añadir un usuario");
    }

})

router.put("/api/", async function(req, res){
    const email = req.body.email //Busacmos al usuario por medio del email
    const {nombre, apellido, telefono, contrasena} = req.body
    
    try{
        const usuario = await User.findOne({email:email});

        if(!usuario){
            return res.status(404).send("Error usuario no encontrado")
        }else{
            usuario.nombre = nombre || usuario.nombre
            usuario.apellido = apellido || usuario.apellido
            usuario.telefono = telefono || usuario.telefono
            usuario.contrasena = contrasena || usuario.contrasena

            // Guarda los cambios en la base de datos
            const updatedUser = await usuario.save();
            return res.json(updatedUser);
        }
    }catch(e){
        console.log("Error ", e)
        return res.status(500).send("Error al cambiar algún dato del usuario")
    }

})

router.delete("/api/", async function(req, res){
    const {nombre, apellido, email, telefono, contrasena} = req.body

    try{
        const usuario = await User.findOneAndDelete({nombre:nombre, apellido:apellido, email:email, telefono:telefono, contrasena:contrasena});
        if(!usuario){
            return res.status(404).send("El usuario no se ha encontrado en la base de datos")
        }else{
            return res.send("Usuario eliminado correctamente")
        }
    }catch(e){
        return res.status(500).send("Error al eliminar el usuario")
    }
    
})

module.exports = router