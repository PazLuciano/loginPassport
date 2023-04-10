const mongoose = require("mongoose");

const usuariosCollection = "usuarios";

const usuariosSchema = new mongoose.Schema({

    nombre : {
        type : String,
        required : true,
    },
    apellido : {
        type : String,
        required : true,
    },
    edad : {
        type : Number,
        required : true
    },
    mail : {
        type : String,
        required : true,
        unique : true
    },
    password : { 
        type : String,
        required : true,
    },
    carrito : {
        type: Array,
        default: []
    }
})
const userModel = mongoose.model(usuariosCollection, usuariosSchema)
module.exports = userModel