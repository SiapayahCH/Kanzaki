const config = require('../config.json')
const version = config.v
var express = require('express');
var http = require('http');
var app = express();

module.exports = client => {
  //console.log(`${client.user.username} Ready to playing with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.setMaxListeners(0)
  function randStatus() {
    let status = [`Update to v1.1.0`, `On ${client.guilds.size} guilds.`, `In ${client.guilds.reduce((c, d) => c + d.channels.size, 0).toLocaleString()} Channels.`,  `With ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Users.`, `k?help for list of command.`, `https://kanzaki.glitch.me/`, `With Tiramitzu#1652`];
    //let status = [`Maintenance`, `Editing Some Commands`, `With Tiramitzu#1652`, `ETA ??:?? JST`]
    let rstatus = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[rstatus], { type: 'PLAYING' }, { status: 'idle'});
  };
setInterval(randStatus, 30000);
  console.log(`//---------------------------
//Kanzaki Kaori is ready!           
//Users: ${client.users.size}       
//Channels: ${client.channels.size} 
//Guilds: ${client.guilds.size}     
//---------------------------`);
  
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 28000);
  
  //process.on('warning', e => console.warn(e.stack));
  //process.setMaxListeners(0);

}
