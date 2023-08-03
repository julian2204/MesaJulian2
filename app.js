const { error } = require('console')

const fs = require('fs').promises 

class Contenedor{
    constructor(file){
        this.file = file
    }
    
    async save(object){
        try {
            const objects = await this.getAllObjects()
            const lastId = objects.length > 0 ? objects[objects.length -1].id : 0
            const newId = lastId +1
            const newObject = {id: newId, ...object}
            objects.push(newObject)
            await this.saveObjects(objects) 
        } catch (error) {
            throw new Error('Error al guardar el objeto')
        }
    }

    async getById(id){
        try {
            const objects = await this.getAllObjects()
            const object = objects.find((obj) => obj.id === id)
            return object || null
        } catch (error) {
            throw new Error('Error al obtener el producto por el ID')
        }
    }

    async getAll(){
        try {
            const objects = await this.getAllObjects()
            return objects
        } catch (error) {
            throw new Error('Error al obtener los objectos')
        }
    }

    async deleteById(id){
        try {
            let objects = await this.getAllObjects()
            objects = objects.filter((obj)=> obj.id !== id)
            await this.saveObjects(objects)
        } catch (error) {
            throw new Error('Error al eliminar objecto') 
        }
    }

    async deleteAll(){
        try {
            await this.saveObjects([])
        } catch (error) {
            throw new Error('Error al eliminar los objectos') 
        }
    }

    async getAllObjects(){
        try {
            const data = await fs.readFile(this.file, 'utf-8')
            return data ? JSON.parse(data) : []
        } catch (error) {
            return []
        }
    }

    async saveObjects(objects){
        try {
            await fs.writeFile(this.file, JSON.stringify(objects, null,2))
        } catch (error) {
            throw new Error('Error al guardar') 
        }
    }

}


// const main = async () => {

//     const contenedorDePrueba = new Contenedor('productos.txt')
//     await contenedorDePrueba.save({
//         title: "Gaseosa",
//         price: 30,
//         thumbnail: "http:imagen.com"
//     })
//     await contenedorDePrueba.save({
//         title: "cerveza",
//         price: 300,
//          thumbnail: "http:imagen2.com"
//     })
//     await contenedorDePrueba.save({
//         title: "casa",
//         price: 3000000,
//         thumbnail: "http:imagen3.com"
//     })
    
//     console.log(await contenedorDePrueba.getById(3))
//     await contenedorDePrueba.deleteAll()
// }

// main().catch((error)=> console.log(error))
