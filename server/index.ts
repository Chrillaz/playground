const path = require('path');
const express = require('express');
require('dotenv').config();

const app = express()

const port = process.env.PORT

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  res.sendFile('/index.html');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})