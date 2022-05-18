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
    let body = req.body

    let id = Number(req.params.id)
    let productsById = await contenedor.getById(id)
    
    if (!productsById) {
      return  res.status(404).json(
        {error: 'Mensaje no encontrado'}
      )
    }

    
    // body.id = productsById.id
    productsById = body

    // productsById.id = id
    // productsById.title = body.title
    // productsById.price = body.price
    // productsById.thumbnail = body.thumbnail



    console.log(productsById)

    contenedor.save(productsById)

    return res.json(productsById)
})

router.delete('/:id', async (req, res) => {
  let id = Number(req.params.id)

  contenedor.deleteById(id)

  return res.send(`Producto Borrado numero ${id}`)

  })

