'use strict'
var mongoose = require('mongoose');
var crypto = require('crypto')

var schema = new mongoose.Schema ({
	firstName: String,
	lastName: String,
	email: {type: String, unique: true, required: true},
	password: String,
	salt: String,
  dateJoined: {type: Date, default: Date.now},
	files: [{type: mongoose.Schema.Types.ObjectId, ref:'File'}],
  filePreferences: [String],
  packagePreferences: [String],
  packages: [{type: mongoose.Schema.Types.ObjectId, ref:'Package'}]
})

var generateSalt = function() {
   return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
   var hash = crypto.createHash('sha1');
   hash.update(plainText);
   hash.update(salt);
   return hash.digest('hex');
};

schema.pre('save', function(next) {

   if (this.isModified('password')) {
       this.salt = this.constructor.generateSalt();
       this.password = this.constructor.encryptPassword(this.password, this.salt);
   }

   next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function(candidatePassword) {
   return encryptPassword(candidatePassword, this.salt) === this.password;
});

module.exports = mongoose.model('User', schema);