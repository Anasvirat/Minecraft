const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Keep Render project awake
app.get('/', (req, res) => res.send('Bot is running.'));
app.listen(process.env.PORT || 3000);

// Start bot
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
    console.log('🚀 Bot spawned!');
    bot.chat('🤖 Bot is arrived!');

    // Move forward and stop every few seconds to prevent AFK kick
    let moving = false;
    setInterval(() => {
      bot.setControlState('forward', moving);
      moving = !moving;
    }, 5000);
  });

  bot.on('kicked', (reason, loggedIn) => {
    console.log('❌ Kicked from server:', reason);
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 5s...');
    setTimeout(startBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('⚠️ Bot error:', err);
  });
}

// Prevent Render crash on error
process.on('uncaughtException', (err) => {
  console.log('❗ Uncaught Exception:', err);
});

startBot();
