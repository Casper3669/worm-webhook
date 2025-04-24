const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Worm is live.');
});

app.post('/webhook', async (req, res) => {
  console.log('Webhook received:', req.body);

  if (discordWebhook) {
    await axios.post(discordWebhook, {
      content: `Worm received: ${JSON.stringify(req.body)}`
    });
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Worm is running on port ${PORT}`);
});
