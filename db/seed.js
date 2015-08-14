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
       firstName: 'Cooper',
       lastName: 'Zelenetz',
       email: 'cooper@gmail.com',
       password: 'cooper'
   }, {
       firstName: 'Led',
       lastName: 'Zeppelin',
       email: 'zep@gmail.com',
       password: 'Led'
   }, {
       firstName: 'Taylor',
       lastName: 'Swift',
       email: 'taylor@gmail.com',
       password: 'Swift'
   }];


   return User.createAsync(users);

};