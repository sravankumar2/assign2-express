  
const express = require('express')
const fs = require('fs')

const app = express()
const PORT = 3000


app.get('/home', (req, res) => {
  return res.json({
    Home: 'Home Page',
  })
})


app.get('/movie', (req, res) => {
  return res.json({
    Movie: 'Movies Page',
  })
})


app.get('/cricket', (req, res) => {
  return res.json({
    Cricket: 'Cricket Page',
  })
})


app.get('/update', (req, res) => {
  fs.readFile('update.txt', 'utf-8', (err, data) => {
    if (err) {
      return res.send(
        'File not Found Error',
      )
    }
    res.send(data)
  })
})


app.post('/update', (req, res) => {
      const data = req.body.data
  fs.writeFile('update.txt', data, (err) => {
    if (!err) res.send(data)
  })
})

app.get('*', (req, res) => {
  res.status(404).send('404 Not found')
})

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))