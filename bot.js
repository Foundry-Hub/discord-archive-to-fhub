// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', (message) => {
    console.log('Message received!');
    console.log(message);
});

// Login to Discord with your client's token
client.login(token);

/*
Message {
  channelId: '1001997086629298187',
  guildId: '797906337409269760',   
  id: '1002009998467014769',       
  createdTimestamp: 1658968200080, 
  type: 0,
  system: false,
  content: 'test 2',
  author: User {
    id: '184744164049682433',      
    bot: false,
    system: false,
    flags: UserFlagsBitField { bitfield: 0 },
    username: 'JDW',
    discriminator: '6422',
    avatar: '7852f1b4689027d610403b54c4be9cc4',
    banner: undefined,
    accentColor: undefined
  },
  pinned: false,
  tts: false,
  nonce: '1002009998793900032',
  embeds: [],
  components: [],
  attachments: Collection(0) [Map] {},
  stickers: Collection(0) [Map] {},
  editedTimestamp: null,
  reactions: ReactionManager { message: [Circular *1] },
  mentions: MessageMentions {
    everyone: false,
    users: Collection(0) [Map] {},
    roles: Collection(0) [Map] {},
    _members: null,
    _channels: null,
    crosspostedChannels: Collection(0) [Map] {},
    repliedUser: null
  },
  webhookId: null,
  groupActivityApplication: null,
  applicationId: null,
  activity: null,
  flags: MessageFlagsBitField { bitfield: 0 },
  reference: null,
  interaction: null
}*/