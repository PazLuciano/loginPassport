const { Router } = require("express");
const UsuarioManager = require("../services/usuariosServices");
const { isValidPasswd, createHashValue } = require("../utils/encrypt");
const passport = require("passport");
const router = Router();
const manager = new UsuarioManager()

  
router.post("/register",
            passport.authenticate("register",{failureRedirect:"/api/v1/session/failregister"}) ,
            async (req, res) => {
        // try {
            res.json({
                ok : true,
                message : "user registered"
            })
        //     const { nombre, apellido, mail, edad, password } = req.body;
        //     const pass = await createHashValue(password);
        //     console.log("pass", pass);
        //     const user = { nombre, apellido, mail, edad, password:pass };
        //     const usuario = await manager.agregarUsuario(user)
        //     // console.log(usuario);
        //     if(usuario == 1){
        //         console.log();
        //         //dar las cookies para que pase directo  a page main.
                
        //         return res.redirect("/login")
        //     } 
        //     if(usuario == 0){
        //         return res.json({
        //             ok : false, 
        //             message: "User already registered"
        //         })
        //     } 
        // } catch (error) {
        //     console.log("15-session", error.message);
        // }
})
router.get("/failregister", async (req, res) => {
    console.log("error en la estrategia");
    res.send("error, user already register")
})

router.post("/login",
    passport.authenticate("login",{failureRedirect:"/api/v1/session/faillogin"}) ,
    async (req, res) =>{
        try {
            // console.log("req user", req.user); // el user completo 
            // console.log("req session", req.session);
            // res.send("seguimosss aca")
            req.session.user = {
            ...req.user[0],
            };

            const user = req.session.user._doc;
            // console.log("user ",user);
            res.render("pagemain", { user: user })
            // res.send("probando")
        } catch (error) {
            console.log(error.message);
        }
    // try {
    //     if(req.session?.user){
    //         console.log("aca?");
    //         const user = req.session.user
    //         console.log(req.session.user);
    //         return res.render("pagemain", user)
    //     }
    //     const { mail, contraseña } = req.body;
    //     const session = req.session;
    //     const findUser = await manager.getUserByMail(mail)
    //     if (!findUser[0]) {
    //       return res.json({ message: `este usuario no esta registrado` });
    //     }
    //     // console.log( findUser[0].password);
    //     const result = await isValidPasswd(contraseña, findUser[0].password)
    //     // console.log(result);
    //     if (!result) {
    //       return res.json({ message: `password incorrecto` });
    //     }

    //     req.session.user = {
    //       ...findUser[0],
    //     };

    //     const user = req.session.user._doc;
    //     console.log(user);
    //     res.render("pagemain", { user: user })

    // } catch (error) {
    //     console.log("sessionRouter 33", error.message);
    // }
})
router.get("/faillogin", async (req, res) => {
    console.log("error en la estrategia");
    res.send("credenciales incorrectas")
})
router.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
      if (!err) return res.redirect("/login");
      return res.send({ message: `logout Error`, body: err });
    });
  });


  router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] }),
    async (req, res) => {
        // console.log("holaa1");
    }
  );
  
  router.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    async (req, res) => {
        // console.log("hola**************************************");
      try {
        // console.log("sessionPAGEMAIN", req.user);
        req.session.user = req.user;
        // console.log("USERRR ULTIMO", req.user);
        res.redirect("/pagemain");
      } catch (error) {
        console.log("🚀 ~ file: session.routes.js:115 ~ error:", error);
      }
    }
  );
  



module.exports = router
