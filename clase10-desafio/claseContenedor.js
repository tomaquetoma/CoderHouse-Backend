const fs = require('fs');

class Contenedor {
    constructor(name){
        this.name = name
    }

    async save(product){

        let data

        try {
            data = await fs.promises.readFile(`./${this.name}`)
            data = JSON.parse(data)
        } catch (error) {
            data = []
        }

        const lastProduct = data[data.length -1]

        let id = 1

        if (lastProduct) {
            id = lastProduct.id + 1
        }
    
        product.id = id

        data.push(product)
    
        return fs.promises.writeFile(`./${this.name}`, JSON.stringify(data, null, 2 ))      
    }

    async getById(idNumber){
        let data

        try {
            data = await fs.promises.readFile(`./${this.name}`)
            data = JSON.parse(data)
        } catch (error) {
            data = []
        }

        return data.find(item => item.id === idNumber)      
    }

    async getAll () {
        let data
        try {
          data = await fs.promises.readFile(`./${this.name}`)
          data = JSON.parse(data)
        } catch (e) {
          data = []
        }
    
        return data
      }


    async deleteById(idNumber){
        let data
        try {
            data = await fs.promises.readFile(`./${this.name}`)
            data = JSON.parse(data)
        } catch (error) {
            data = []
        }

        const dataDeleteId = data.filter((item) => item.id !== idNumber)

        await fs.promises.writeFile(`./${this.name}`, JSON.stringify(dataDeleteId, null, 2 ))
 
    }


    async deleteAll(){
        fs.promises.writeFile(`./${this.name}`, '')
        console.log('productos borrados')
    }
}

module.exports = Contenedor