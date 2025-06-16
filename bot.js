const express = require('express');
const path = require('path');
const { startBot } = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Call this when UI button is clicked
app.get('/start-bot', (req, res) => {
  startBot();
  res.send('Bot started');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
