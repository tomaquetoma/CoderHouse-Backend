const express = require('express');
const { Router } = express;
const Api = require("./apiFunc.js");
const Chat = require("./ChatFunc.js");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");

const app = express()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const router = Router();

const PORT = 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.set("view engine", "ejs"); 
app.set("views", "./views") 

let productos = [
    {
        "id": 1,
        "title": "Lapiz",
        "price": 100,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-256.png"
      },
      {
        "id": 2,
        "title": "Escuadra",
        "price": 300,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
      },
      {
        "id": 3,
        "title": "Calculadora",
        "price": 560,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
      }
];

const myApi = new Api(productos);
const myChat = new Chat("mensajes.json");

io.on("connection", async socket => { 
    
    console.log("Un nuevo cliente se ha conectado");
    socket.emit("Productos", productos);
    socket.emit("Mensajes", await myChat.getAll());

    socket.on("new-message", async data => {
        data.time = new Date().toLocaleString()//moment().locale("es").format('MMMM Do YYYY, h:mm:ss a'); 
        await myChat.save(data);
        io.sockets.emit("MensajeIndividual", data)
    })

    socket.on("nuevo-producto", data => {
        io.sockets.emit("ProductoIndividual", data)
    })
})

router.get('/productos/:id', (req, res) => {
    return myApi.getProduct(req, res)
 })

router.get('/productos', (req, res) => {
    return myApi.getProducts(req, res)
 })

router.post('/productos', (req, res) => {
    return myApi.postProduct(req, res)
 })

router.put("/productos/:id", (req, res) => {
    return myApi.putProduct(req, res)
})

router.delete("/productos/:id", (req, res) => {
    return myApi.deleteProduct(req, res)
})

router.get("/", (req, res) => {
    res.render("pages/index", { productos: productos});
});

app.use('/', router);