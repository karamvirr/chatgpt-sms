const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const { urlencoded } = require('body-parser');

const port = 3000;
const app = express();
app.use(urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  // Access the message body.
  const message = req.body.Body;

  twiml.message('Waiting for the ChatGPT API to become public...');

  res.type('text/xml').send(twiml.toString());
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
