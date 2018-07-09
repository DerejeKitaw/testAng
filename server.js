// var express     = require('express'),
//     session     = require('express-session'),
//     bodyParser  = require('body-parser'),
//     path        = require('path'),
//     app         = express(),
//     // routes      = require('./server/config/routes.js'),
//     port = 8000,
  // passport = require('passport');
    
// require('./server/config/mongoose.js');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users    = require('./server/routes/api/users');
const projects = require('./server/routes/api/projects');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// DB Config
const db = require('./server/config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./server/config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use(express.static(path.join(__dirname, '/client/dist/client')));

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
  app.all("*", (req, res, next) => {
		res.sendFile(path.resolve("./client/dist/client/index.html"))
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));


// app.use(express.static(path.join(__dirname, '/client/dist/client')));
// // console.log(routes);
// // routes(app);

// app.listen(port, () => {
//   console.log(`listening on ${port}`);
// });


