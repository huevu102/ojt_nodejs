require('./info/mongodb')
const User = require('./controllers/user-controller')

const express = require('express')
const app = express()
const port = 3000

// //passport
// require('./config/passport')
// const passport = require('passport')
// app.use(passport.initialize());
// //

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
// app.post('/sign-in', 
//   passport.authenticate("local-login", {
//     successReturnToOrRedirect: "/",
//     failureRedirect: "/sign-in",
//     failureFlash: true,
//     badRequestMessage: 'Invalid email or password.'
//   })
// )

// get sign-up page
app.get('/sign-up', function(req, res) {
  res.render('pages/sign-up')
})
app.post('/sign-up', User.createUser)

// get users-mgmt page
app.get('/users-mgmt', async function(req, res) {
  const users = await User.getAllUsers()
  res.render('pages/users-mgmt', {data: users})
})
app.post('/users-mgmt/update/:id', User.updateUser)
app.post('/users-mgmt/delete/:id', User.deleteUser)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
