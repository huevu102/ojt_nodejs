require('./info/mongodb')
const User = require('./controllers/user-controller')

const express = require('express')
const app = express()
const port = 3000

// set view engine to ejs
app.set('view engine', 'ejs')
// use res.render to load up an ejs view file

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// get home page
app.get('/', function(req, res) {
  res.render('pages/home')
})

// get sign-in page
app.get('/sign-in', function(req, res) {
  res.render('pages/sign-in')
})

// get sign-up page
app.get('/sign-up', function(req, res) {
  res.render('pages/sign-up')
})
app.post('/users-mgmt', async function(req, res) {
  User.createUser()
})

// get users-mgmt page
app.get('/users-mgmt', async function(req, res) {
  const users = await User.getAllUsers()
  res.render('pages/users-mgmt', {data: users})
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})