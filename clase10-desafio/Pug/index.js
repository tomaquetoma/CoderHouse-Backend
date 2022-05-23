const express = require('express')

// const { Router } = express

const Contenedor = require('../../clase10-desafio/claseContenedor')

const app = express()
// const router = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('/api', router)

app.set("view engine", "pug"); 
app.set("views", "./views") 

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

server.on('error', (error) => console.log(`Error en servidor: ${error}`))

const contenedor = new Contenedor('products.txt')

app.get('', async (req, res) => {

 res.render('index')
})

app.get('/productos', async (req, res) => {

        const productos = await contenedor.getAll()

        return res.render('productos', {productos})
  })

app.post('/productos', async (req, res) => {
  const producto = req.body

  await contenedor.save(producto)

  return res.redirect('/')

  })



