const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [
 { id: 1, name: 'Andrew', username: 'u', password: 'p' }
 ];

const router = express.Router();

router.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(
 (username, password, done) => {
 const user = users.find(u => u.username === username);
 if (!user) {
 return done(null, false, { message: 'Incorrect username.' });
 }
 if (user.password !== password) {
 return done(null, false, { message: 'Incorrect password.' });
 }
 return done(null, user);
 }
 ));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.get('/login', function(req, res) {
  res.render('login.ejs');
});

router.post('/login/password', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    }));


// handle get request for path /products
router.get('/products', (request, response) => {
   return response.json(products);
});

// handle get request for path /products/:brand
router.get('/products/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params; // Access the brand parameter from the URL

   // Filter products based on the brand parameter
   const filteredProducts = products.filter(product => product.brand === brand);

   response.json(filteredProducts); // Send the filtered products as a JSON response
});

router.get('/productswitherror', (request, response) => {
   let err = new Error("processing error!")
   err.statusCode = 400
   throw err
});

router.get("/", (req, res) => {   
    res.render("dashboard.ejs", {name: req.user.name})
});

module.exports = router;