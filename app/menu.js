var remote = require('remote')
var Menu = remote.require('menu')
var ipc = require('ipc')

var template = [
  {
    label: 'Silhouette',
  },
  {
    label: 'Options',
    submenu: [
  	  {
		    label: 'Logout',
		    click: function () {
		    	ipc.send('logout')
		    }
		  }
    ]
  }
]

var menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);

