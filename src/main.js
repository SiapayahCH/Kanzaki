const { ShardingManager } = require('discord.js');

const Manager = new ShardingManager('./src/app.js', {
  totalShards: 1, 
  token: process.env.SECRET, 
  respawn: false
});

Manager.spawn(this.totalShard, 1000, true);
Manager.on('launch', shard => {
    console.log(`💎 Launch Shard ${shard.id} [${shard.id + 1}/${Manager.totalShards}]`);
});

Manager.on('message', (shard, message) => {
    console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});

process.on('unhandledRejection', e => console.error(e))
.on('uncaughtException', e => console.error(e));

//Manager.spawn(2)

// udah di spawn diatas jan di spawn lage