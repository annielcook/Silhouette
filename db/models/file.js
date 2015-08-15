'use strict'
var mongoose = require('mongoose');
var crate = require('mongoose-crate');
var S3 = require('mongoose-crate-s3');

var FileSchema = new mongoose.Schema({
    title: String,
    description: String
});

FileSchema.plugin(crate, {
  storage: new S3({
    key: 'AKIAIR3AHFWLCKNNHGRQ',
    secret: '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',
    bucket: 'silhouette.datastorage',
    acl: 'public-read', // defaults to public-read
    region: 'us-standard', // defaults to us-standard
    path: function(attachment) { // where the file is stored in the bucket - defaults to this function
      return '/' + path.basename(attachment.path)
    }
  }),
  fields: {
    file: {}
  }
})

var File = mongoose.model('File', FileSchema)