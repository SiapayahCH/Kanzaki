const Kanzaki = require('./handle/Kirayuna');
const client = new Kanzaki({
  fetchAllMembers: true,
  disabledEvents: ["TYPING_START", "USER_NOTE_UPDATE"],
  disableEveryone: true
});

require('./handle/events')(client);
require('./handle/module')(client);

client.login(process.env.SECRET);