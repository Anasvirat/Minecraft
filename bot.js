const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Web ping to prevent Render sleep
app.get('/', (req, res) => res.send('Bot is running.'));
app.listen(process.env.PORT || 3000);

function startBot() {
  const bot = mineflayer.createBot({
    host: 'Anasvirat.aternos.me',
    port: 59769,
    username: 'AFK_Bot',
    version: '1.21.1'
  });

  bot.on('login', () => {
    console.log('✅ Bot logged in');
  });

  bot.once('spawn', () => {
    console.log('🚀 Bot spawned into world');
    bot.chat('🤖 Bot is arrived!');
  });

  bot.on('end', () => {
    console.log('❌ Disconnected, trying to reconnect...');
    setTimeout(startBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('⚠️ Bot error:', err);
  });
}

startBot();
