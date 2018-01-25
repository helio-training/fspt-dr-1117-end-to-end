'use strict'

const Hapi = require('hapi')
const Monk = require('monk')

const server = Hapi.server({ 
    host: 'localhost', 
    port: 3001
})

const getCarsCollection = async () => {
    const connectionString = "mongodb://application:super1337@ds113358.mlab.com:13358/dealership"
    const db = Monk(connectionString)
    const cars = await db.get("cars")
    return cars
}

server.route({
    method: 'GET',
    path:'/', 
    handler: (request, h) => {
        return { message: 'hello world' }
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

server.route({
    method: 'GET',
    path:'/cars', 
    handler: async (request, h) => {
        const cars = await getCarsCollection()
        const carObjects = await cars.find()
        console.log(carObjects)
        return { cars: carObjects ? carObjects : [] }
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

server.route({
    method: 'POST',
    path: '/cars',
    handler: async (request, h) => {
        const cars = await getCarsCollection()
        cars.insert(request.payload)
        console.log(request.payload)
        return h.response()
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

async function start() {

    try {
        await server.start()
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }

    console.log('Server running at:', server.info.uri)
}

start()