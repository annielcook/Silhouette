var File = mongoose.model('File');
var User = mongoose.model('User');
var fs = require('fs');


app.factory('FileManagerFactory', function($rootScope){
  return{  
    addFile: function(event){
      var file = event.target.files[0];
      var data = fs.readFileSync(file.path, 'utf8');
      return File.create({'name': file.name, 'content': data, 'path': file.path})
      .then(function(createdFile){
        return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {$push: {files: createdFile} }, {new : true})
      })
      .then(function(user){
        return user;
      })
      .then(null, function (err) {
        throw err;
      });
    },
    getAllFiles: function(){
      return User.findOne({email: $rootScope.currentUser.email})
      .populate('files')
      .then(function(user){
        console.log("user: ", user)
        console.log("user.files: ", user.files)
        return user.files
      })
      .then(null, function(error){
        console.log(error)
      })
    },
    addFilePrefs: function(filename){
      var filePrefs = [];
      var fileIndex = filePrefs.indexOf(filename);
      if(fileIndex === -1){
        filePrefs.push(filename);
      } else {
        filePrefs.splice(fileIndex, 1);
      }
      return filePrefs;
    }
 }
})