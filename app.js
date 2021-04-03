require('dotenv').config()
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session')
const app = express();
const PORT = 3000;
require('./passport-setup')

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
}))

app.set('view engine','ejs')
app.use(passport.initialize())

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.get('/success',(req,res)=>{
    res.render('profile.ejs')
})
app.get('/google',passport.authenticate('google',{scope:['profile','email']}))
app.get('/google/callback',passport.authenticate('google',{ failureRedirect:'/failed'}),
  function(req,res){
      res.redirect('/success')
  }
)
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})
 
app.listen(PORT,()=>{
    console.log(`Application is running on Port ${PORT}`)
})