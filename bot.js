const mineflayer = require('mineflayer');

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

    // Auto message every 5 minutes
    setInterval(() => {
      bot.chat('🤖 I am still online and active!');
    }, 300000);

    // Respond to player messages
    bot.on('chat', (username, message) => {
      if (username === bot.username) return;
      const msg = message.toLowerCase();

      if (msg.includes('hi') || msg.includes('hello')) {
        bot.chat(`👋 Hello ${username}!`);
      } else if (msg.includes('where')) {
        bot.chat("🗺️ I'm just chilling AFK!");
      } else if (msg.includes('who are you')) {
        bot.chat("🤖 I'm your friendly AFK bot!");
      }
    });

    // Light jumping to prevent AFK kick
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);
  });

  bot.on('end', () => {
    console.log('❌ Disconnected, reconnecting...');
    setTimeout(startBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('⚠️ Bot error:', err);
  });
}

startBot();
