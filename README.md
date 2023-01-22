# ChatGPT via SMS

A ChatGPT SMS server built using Node.js, the Twilio API, and the OpenAI API.

### Usage
This project requires both a Twilio and OpenAI account. 
- Instructions for setting up a Twilio account can be found [here](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account).
- An OpenAI developer account can be set up [here](https://openai.com/api/).

Server setup instructions:
- Open the terminal and change the working directory to where you want the cloned repository (ex. `cd ~/Desktop`).
- Clone repository: `git clone https://github.com/karamvirr/chatgpt-sms.git`
- From the root, create a `.env` containing your OpenAI API KEY `OPENAI_API_KEY` and server port number `PORT` (port 3000 is used if not set).
- Change the working directory to the cloned repo: `cd chatgpt-sms`
- Install dependencies: `npm install`
- Run server: `node server.js`

We can expose this local server to the public internet using [ngrok](https://ngrok.com/). 
- Install ngrok: `brew install ngrok/ngrok/ngrok`.
- Start a tunnel: `ngrok http N` where 'N' is whatever value is stored in `process.env.PORT` (or 3000).
<img width="929" alt="Screen Shot 2023-01-21 at 10 00 26 PM" src="https://user-images.githubusercontent.com/21179214/213902907-0709090b-f772-442a-80e5-a46aec9ae819.png">

Set your webhook for incoming messages in your Twilio account, as shown below. Make sure it makes an HTTP POST request on `/sms`. 
<img width="997" alt="Screen Shot 2023-01-21 at 10 09 09 PM" src="https://user-images.githubusercontent.com/21179214/213903150-180681c5-998c-416e-89ca-fc3a67fce01c.png">

That's it! 🥳

Now that it's configured, inbound SMS messages to your Twilio account number will trigger an HTTP POST request to the server, which will make a request to the OpenAI server and return the text from that response to the user via an outbound SMS.

Example output:

![IMG_7666-2](https://user-images.githubusercontent.com/21179214/213903835-e47e8b3c-a8ec-4170-b277-30405bc5ea06.png)


### License
This project is [MIT licensed](./LICENSE).
