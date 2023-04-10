const express = require("express");

const routerProducts = require("./routes/productsRouter");
const routerCarts = require("./routes/cartsRouter");
const routerViews = require("./routes/viewsRouter")
const routerSession = require("./routes/sessionRouter")

const mongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const handlebars = require("express-handlebars");
const passport = require("passport");
const initializePassport = require("./config/passport.config");


const { Server } = require("socket.io");
const { mongoDBconnection } = require("./dataBase/mongo.config");

const path = require("path")

const PORT = 3000;
const BASE = "api/v1"
const app = express();

const connectToBBDD = async () => {
    try {
        await mongoDBconnection()  
    } catch (error) {
        console.log(error.message);
    }
}
const DB_NAME = "ecommerce-DB";
const url = `mongodb://127.0.0.1:27017/${DB_NAME}`
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: url,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60 * 3600,
    }),
    secret: "secretSession",
    resave: false,
    saveUninitialized: false,
  })
);

connectToBBDD()

// HANDLEBARS CONFIGURACION
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));

initializePassport()
app.use(passport.initialize());
app.use(passport.session())

app.use(`/${BASE}/products`, routerProducts)
app.use(`/${BASE}/carts` , routerCarts)
app.use(`/${BASE}/session`, routerSession)
app.use(`/`, routerViews)
// app.use(`/${BASE}/chat`, routerChat)

const server = app.listen(PORT, () => {
    console.log(`API run port ${PORT}`);
})

const ChatManager = require("./services/chatServices");


const manager = new ChatManager;

app.get("/api/v1/chat", async (req, res) => {
    const messages = await manager.getMessages()
    console.log("messages -->", messages);
    res.render("chat", messages )
})

const io = new Server(server)

// io.on("connection", async (socket) => {
//     console.log("New client is connect");

//     socket.on("message", async (data) => {
        
//             if(data.message){
//                 const info = await manager.addMessage(data.user, data.message)
//                 console.log("guardamos");
//                 io.emit("actualizar", info)

//      }
//     })
  


// })



app.use((req, res) => {
    res.status(404).json({
        ok : false,
        error : "Not found11"
    })
})








