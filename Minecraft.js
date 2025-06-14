const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: "BloxfruitGroup.aternos.me", // Your Aternos server address
  port: 18536, // default port
  username: "24/7 bot"
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  bot.chat(`Hello ${username}!`);
});
