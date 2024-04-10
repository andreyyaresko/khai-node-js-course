const express = require('express'),
    app = express(),
    session = require('express-session'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

const host = '127.0.0.1';
const port = 3000;

app.use(express.urlencoded({extended: false}));

app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}));
app.use(passport.initialize());
app.use(passport.session());

authUser = (user, password, done) => {
let authenticated_user = { id: 123, name: "Kyle"}
   return done (null, authenticated_user )
}

passport.use(new localStrategy(authUser));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});

/*checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { 
       return res.redirect("/")
   }
  next()
}*/

app.get("/login", (req, res) => {
    res.render("login.ejs")

});


app.post ("/login/password", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
}));

/*function checkAuth() {
    return app.use((req, res, next) => {
        if (req.isAuthenticated()) next();
        else res.redirect('/login');
    });
}*/

app.get("/", (req, res) => {   
    res.render("dashboard.ejs", {name: req.user.name})
});

/*

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error');
});*/

