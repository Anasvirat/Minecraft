const mineflayer = require('mineflayer');
const express = require('express');

// Web server to prevent Render from sleeping
const app = express();
app.get('/', (_, res) => res.send('Bot is running'));
app.listen(3000);

function startBot() {
  const bot = mineflayer.createBot({
    host: 'Anasvirat.aternos.me',
    port: 59769,
    username: 'AFK_Bot',
    version: '1.21.1' // ✅ Explicitly set Minecraft version
  });

  bot.on('login', () => {
    console.log('Bot logged in!');
  });

  bot.once('spawn', () => {
    console.log('Bot spawned!');
    bot.chat('Bot is arrived'); // ✅ Bot sends this in chat after joining

    // Optional AFK movement to prevent kicks
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);
  });

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting...');
    setTimeout(startBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('Error:', err);
  });
}

startBot();
