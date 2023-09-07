const express = require('express')
require('dotenv').config()
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
const db = require("./mongoose")
const router = require('./routes/routing')
db()

app.use(cors())
app.use('/patent',router)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))