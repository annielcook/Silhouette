var exec = require('child_process').exec;
var Promise = require('bluebird');



var availableApps = new Promise(function(resolve, reject){
	exec("brew cask search", function (err, stdout, stderr) {
		if(err) return reject(err);
		var rawOut = stdout
		var formattedOut = JSON.parse("[\"" + rawOut.substr(20, rawOut.length - 21).replace(/\n/gi, "\", \"") + "\"]")

		// console.log("formattedOut: ", formattedOut)
		// console.log("typeof formattedOut: ", typeof formattedOut)
		// console.log("is formattedOut an array? ", Array.isArray(formattedOut))
		resolve(formattedOut)
	})
})

console.log("availableApps in list file: ", availableApps)


module.exports = availableApps

