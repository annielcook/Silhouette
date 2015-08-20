var fs = require('fs');
var File = mongoose.model('File');
var User = mongoose.model('User');
var fs = require('fs');

app.factory('FileManagerFactory', function($rootScope){
  return{  
    addFile: function(event, fileObject){
      var file, data;
      if(event){
        file = event.target.files[0];
        data = fs.readFileSync(file.path, 'utf8');
      }else{
        // console.log('fileObject', fileObject);
        file = fileObject;
        data = fileObject.content;
      }
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
        return user.files
      })
      .then(null, function(error){
        console.log(error)
      })
    },
    addFilePrefs: function(filename, filePrefs){
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
      // console.log("typeof fileId: ", typeof fileId)
      return File.findById(fileId)
      .remove()
      .then(function(file){
        return User.findOneAndUpdate({email: $rootScope.currentUser.email}, {$pull: {files: fileId} }, {new : true})
      })
      .then(null, function(error){
        console.log(error)
      })
    },
    changeFile: function(file){
      return File.findById(file.id)
      .then(function(foundFile){
        foundFile.content = file.content
        foundFile.date = file.date
        return foundFile.save()
      })
      .then(null, function(error){
        console.log(error)
      })
    }
  }
})