const userModel = require("../models/usuariosModel");

class UsuarioManager {
    async agregarUsuario(usuario) {
        // validar usuario
        try {
            // console.log("TODAVIAN O LLEGA ACA");
            const user = await userModel.create(usuario);
            
            return user
        } catch (error) {
            console.log("12",error.message);
            // console.log(typeof(error.message));
            // if(error.message.includes("duplicate key")){
            //     return 0
            // }
            return 0
        }
    }
    async getUserByMail(mail){
        try {
            // console.log(mail);
           const user = await userModel.find({mail : mail})
        //    console.log(user, "desde service");
           return user
        } catch (error) {
            console.log("serviceUser23", error.message);
        }
    }
}


module.exports = UsuarioManager