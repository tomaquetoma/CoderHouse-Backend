const express = require('express')

const Contenedor = require('../clase06-desafio/claseContenedor')

const app = express()

const PORT = 8080

app.get('/', (req, res) => {
    res.send(`<h1 style = "color:blue; text-align:center;"> BIENVENIDOS AL SERVIDOR EXPRESS - DESAFIO CLASE 6 - TOMAS DI LUCA</h1>`)
})

const contenedor = new Contenedor('productos.txt')

app.get('/productos', (req, res) => {
    ;(async () =>{
        const productsAll = await contenedor.getAll()
        res.send(productsAll)
    })()
})

app.get('/productoRandom', (req, res) => {
    ;(async () =>{
        const allProducts = await contenedor.getAll()
        let productRandomLength = Math.random()*allProducts.length
        let productRandom = Math.round(productRandomLength)

        if (productRandom === 0) {
            productRandom = 1
        }
        let productById = await contenedor.getById(productRandom)
        res.send({productById})
    })()
})

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

server.on('error', (error) => console.log(`Error en servidor: ${error}`))