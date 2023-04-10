const passport = require("passport");
const local = require("passport-local")
const UsuarioManager = require("../services/usuariosServices");
const { isValidPasswd, createHashValue } = require("../utils/encrypt");
const { create } = require("connect-mongo");
const GithubStrategy = require("passport-github2");
const { getMaxListeners } = require("../models/usuariosModel");

const manager = new UsuarioManager()

const GITHUB_CLIENT_ID = "4e032d94e39ffe5e6927"; // USE VARIABLES DE ENTORNO
const GITHUB_CLIENT_SECRET = "ca901cacbd85f36858dda86fb65637f70f665575"; // USE VARIABLES DE ENTORNO

const localStrategy = local.Strategy;

const initializePassport = () => {
    passport.use("register", new localStrategy (
        {passReqToCallback:true, usernameField:"mail"}, async (req, username, password, done) => {
            const { nombre, apellido, mail, edad, } = req.body; //password
            try {
                // console.log("username", username);
                const user = await manager.getUserByMail(username);
                console.log("USER l16", user[0]);
                if(user[0] == undefined){
                    const pass = await createHashValue(password);
                    // console.log("pass", pass);
                    const newUser = {nombre, apellido, mail, edad,password:pass}
                    const createUser = await manager.agregarUsuario(newUser)
                    // console.log("USUARIO NUEVO ", createUser);
                    if(createUser!=0){
                        return done (null, createUser)
                    }                   
                }
                console.log("user already exist");
                return done(null, false);
                
            } catch (error) {
                return done ("error al obtener el user: " + error)
            }
            
        }
    ))  

    passport.use("login", new localStrategy(
        {usernameField : "mail", passwordField: "contraseña"}, async (username, password, done) => {
            try {
                // console.log(username, password);
                const findUser = await manager.getUserByMail(username)
                if (!findUser[0]) {
                return done(null, false)
                }
                // console.log( findUser[0].password);
                const result = await isValidPasswd(password, findUser[0].password)
                // console.log(result);
                if (!result) {
                return done(null, false)
                }
                return done(null, findUser)

            } catch (error) {
                return done(error)
            }
        })
        
    )
    passport.use(
        "github",
        new GithubStrategy(
          {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/v1/session/github/callback",
          },
          async (accessToken, refreshToken, profile, done) => {
            try {
            //   console.log("PROFILE INFO ******", profile);
              const email = profile._json?.email || "prueba@gmail.com"
              // console.log("email", email);
              let user = await manager.getUserByMail(email);
            //   console.log("USER", user);
              if (!user) {
                // console.log("AAAAAAAA");
                let addNewUser = {
                  nombre: profile._json.login ,
                  apellido: "prueba",
                  mail: "prueba@gmail.com",
                  edad: 20,
                  password: " ",
                };
                let newUser = await manager.agregarUsuario(addNewUser);
                done(null, newUser);
              } else {
                // ya existia el usuario
                // console.log("por aca?");
                // console.log("user L95", user[0]);
                done(null, user[0]);
              }
            } catch (error) {
              return done(error);
            }
          }
        )
      );


    passport.serializeUser((user, done) => {
        console.log("serialize");
        // console.log(user);
        // console.log(user, "serialize");
        done(null, user.mail || user[0].mail);
      });
    
      passport.deserializeUser(async (id, done) => {
        console.log("deserialize");
        // console.log(id);
        let user = await manager.getUserByMail(id);
        console.log(user);
        done(null, user);
      });
}


module.exports = initializePassport;