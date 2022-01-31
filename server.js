require("dotenv").config()
require('./src/db/db.connection')
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('common'))
app.use('/uploads',express.static('uploads'))
app.use(cors({
    origin: '*',
}))

app.listen(port, () => console.log(`Server is Running on port ${port}!`))
const adminRoutes=require('./src/routes/admin.routes')
const classRoutes=require('./src/routes/class.routes')
app.use('/admin', adminRoutes)
app.use('/class',classRoutes)
app.get('/',(req, res) => {
    res.send('server started')
})