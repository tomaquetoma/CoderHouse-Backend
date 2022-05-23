const express = require('express')

const {engine} = require('express-handlebars')

const Contenedor = require('../../clase10-desafio/claseContenedor')

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.set("view engine", "hbs"); 
app.set("views", "./views") 

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

server.on('error', (error) => console.log(`Error en servidor: ${error}`))

app.engine('hbs', engine({
  extname: ".hbs",
  defaultLayout: `${__dirname}/views/index.hbs`,
  layoutsDir: `${__dirname}/views/layouts`,
  partialsDir: `${__dirname}/views/partials`,
})
);

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



