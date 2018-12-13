let chatClient;
let username;
let generalChannel;

axios.post('/token', { deviceId: 'browser', identity: 'testinho3' })
  .then(res => {
    username = res.data.identity;
    console.log(`user assigned: ${username}`);

    Twilio.Chat.Client.create(res.data.token).then(client => {
      console.log('client: ', client);
      chatClient = client;
      chatClient.getSubscribedChannels().then(createOrJoinGeneralChannel);
    });
  })

function createOrJoinGeneralChannel () {
  chatClient.getChannelByUniqueName('general')
  .then(channel => {
    generalChannel = channel;
    console.log('general channel: ', generalChannel);
    setupChannel();
  })
}

function setupChannel() {
  generalChannel.join().then(channel => {
    console.log('Joined channel as: ', username);
  });

  generalChannel.on('messageAdded', function(message) {
    console.log(message.author, message.body);
  });
}

// generalChannel.sendMessage('message');