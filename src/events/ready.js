const config = require('../config.json')
const version = config.v
var express = require('express');
var http = require('http');
var app = express();

module.exports = client => {
  console.log(`${client.user.username} Ready to playing with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.setMaxListeners(1000)
  function randStatus() {
    let status = [/*`Update to Alpha Testing 0.0.1`, */`On ${client.guilds.size} guilds.`, `In ${client.guilds.reduce((c, d) => c + d.channels.size, 0).toLocaleString()} Channels.`,  `With ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Users.`, `On DiscordBots Nation™!`, `k?help for list of command.`, `https://kanzaki.glitch.me/`, `With Tiramitzu#0335`];
    //let status = [`Maintenance`, `Editing Music Commands [Duration Limit]`, `With Tiramitzu#1652`, `ETA 20:00 WIB`]
    let rstatus = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[rstatus], { type: 'PLAYING' }, { status: 'idle'});
  };
setInterval(randStatus, 30000);
  console.log(`${client.user.username} sukses online!`);
  
  app.use(express.static('public'));
  app.get('/', function(request, response) {
    response.sendStatus(200);
  });

var listener = app.listen(process.env.PORT, function() {
  console.log('This App Is Listening To Port: ' + listener.address().port);
});
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 28000);

}
