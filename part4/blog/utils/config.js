require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.URI

module.exports = {
    MONGODB_URI,
    PORT
}