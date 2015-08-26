var mongoose = require('mongoose');
var Promise = require('bluebird');
require('./models/index.js');
var User = Promise.promisifyAll(mongoose.model('User'));
var db = mongoose.connect('mongodb://silhouette:silhouette1506@ds031893.mongolab.com:31893/silhouette').connection;

var connect = new Promise(function(res, rej){
  db.on('open', res);
  db.on('error', rej);
});
 

var seedUsers = function() {

   var users = [{
       firstName: 'test',
       lastName: 'test',
       email: 'testing@fsa.com',
       password: 'password',
   }, {
       firstName: 'Barack',
       lastName: 'Obama',
       email: 'obama@gmail.com',
       password: 'potus'
   }, {
       firstName: 'Steve',
       lastName: 'Jobs',
       email: 'Steve@gmail.com',
       password: 'apple'
   }, {
       firstName: 'Elon',
       lastName: 'Musk',
       email: 'Elon@gmail.com',
       password: 'Tesla'
   }, {
        firstName: 'Cooper',
        lastName: 'Zelenetz',
        photo: 'http://ak-hdl.buzzfed.com/static/2014-05/enhanced/webdr08/7/11/enhanced-buzz-9911-1399476833-28.jpg',
        email: 'cooper@gmail.com',
        password: 'cooper',
        isAdmin: true,
   }, {
       firstName: 'Taylor',
       lastName: 'Swift',
       email: 'taylor@gmail.com',
       password: 'Swift'
   }];


   return User.createAsync(users);

};

connect.then(function () {
  console.log('MongoDb connection opened. Yay!');
  mongoose.connection.db.dropDatabase(function() {
    seedUsers()
      .then(function(arrUser) {
        console.log('1) We seed users first');
        process.kill(0);
      })
  });

})

