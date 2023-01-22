require('dotenv').config()

const port = process.env.PORT || 3000;
const express = require('express');
const { urlencoded } = require('body-parser');
const { MessagingResponse } = require('twilio').twiml;
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(urlencoded({ extended: false }));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/sms', async (req, res) => {
  const twiml = new MessagingResponse();

  // Access the message body.
  const prompt = req.body.Body;
  const promptResponse = await getResponse(prompt);
  twiml.message(promptResponse);

  res.type('text/xml').send(twiml.toString());
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

const getResponse = async (prompt) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 320,
      best_of: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      logprobs: 0,
      top_p: 1
    });
    console.log(prompt, completion.data.choices[0].text);
    return completion.data.choices[0].text;
  } catch (error) {
    console.log(error.message);
    return 'Failed to make request.';
  }
};
