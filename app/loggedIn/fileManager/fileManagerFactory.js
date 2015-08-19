var fs = require('fs');
var File = mongoose.model('File');
var User = mongoose.model('User');

app.factory('FileManagerFactory', function($rootScope){
  return{  
    addFile: function(event){
      var file = event.target.files[0];
      var data = fs.readFileSync(file.path, 'utf8');
      File.create({'name': file.name, 'content': data, 'path': file.path})
      .then(function(createdFile){
        return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {$push: {files: createdFile} }, {new : true})
      })
      .then(null, function (err) {
        throw err;
      });
    },
    getAllFiles: function(){
      return User.findOne({email: $rootScope.currentUser.email})
      .populate('files')
      .then(function(user){
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
    },
    deleteFile: function(fileId){
      console.log("file in factory: ", fileId)
      File.findOne({ id: fileId })
      .then(function(file){
        console.log("in .then")
        console.log("file in .then: ", file)
      })
    }
 }
})