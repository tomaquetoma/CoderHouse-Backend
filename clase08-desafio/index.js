const express = require('express')

const { Router } = express

const Contenedor = require('../clase08-desafio/claseContenedor')

const app = express()
const router = Router()

app.use('/static', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', router)
 
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`) 
})

server.on('error', (error) => console.log(`Error en servidor: ${error}`))

app.get('', (req, res) => {
  return res.send({Bienvenido: 'Desafio Coderhouse Clase 08'})
})

const contenedor = new Contenedor('products.txt')

router.get('', async (req, res) => {
        const productsAll = await contenedor.getAll()

        return res.send(productsAll)
  })

  router.get('/:id', async (req, res) => {
        let id = Number(req.params.id)
        const productsById = await contenedor.getById(id)

        if (!productsById) {
          return  res.status(404).json(
            {error: 'Mensaje no encontrado'}
          )
        }

        return res.json(productsById)
  })
  


router.post('', async (req, res) => {
  const producto = req.body

  console.log(producto)

  await contenedor.save(producto)

  return res.status(201).json(producto)

  })

  router.put('/:id', async (req, res) => {

    console.log('PUT request recibido')
    
    const id = Number(req.params.id)
    
    const products = await contenedor.getAll()
    
    const productsIndex = products.findIndex(product => product.id === id)

    if (productsIndex === -1) {
      return res.status(404).json(
        {error: 'Producto no encontrado'}
      )
    }

    let body = req.body

    products[productsIndex].title = body.title
    products[productsIndex].price = body.price
    products[productsIndex].thumbnail = body.thumbnail

    console.log(products)

    contenedor.saveAll(products)

    return res.json(products)
})

router.delete('/:id', async (req, res) => {
  let id = Number(req.params.id)

  contenedor.deleteById(id)

  return res.send(`Producto Borrado numero ${id}`)

  })

