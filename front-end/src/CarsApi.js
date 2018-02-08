let ConfigOverride
try{
    ConfigOverride = require("./config.json")
} catch (e) {
    // console.log(e)
}

const runConfig = () => {    
    this.config = {
        carsApiRoot: ConfigOverride 
                        ? ConfigOverride.carsApiRoot 
                        : process.env.REACT_APP_CARS_API_ROOT,
        graphQL: ConfigOverride
                    ? ConfigOverride.graphQL
                    : process.env.REACT_APP_GRAPH_QL
    }
}
runConfig()

const postData = async (path, data) => {
    const url = `${this.config.carsApiRoot}${path}`
    const response = await fetch(url, {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(response)
    return response
}

const getData = async (path) => {
    const url = `${this.config.carsApiRoot}${path}`
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export default {
    post: postData,
    get: getData,
    graphQL: this.config.graphQL
}