let ConfigOverride
try{
    ConfigOverride = require("./config.json")
} catch (e) {
    // console.log(e)
}

const runConfig = () => {    
    this.config = {
        mongoConnString: ConfigOverride 
                        ? ConfigOverride.mongoConnString 
                        : process.env.MONGO_CONN_STRING
    }
    console.log(this.config)
}
runConfig()
console.log(this.config)

module.exports = this.config