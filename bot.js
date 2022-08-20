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
	//if (message.channelId === 'CONTENT_CHANNEL_ID')
		Archivist.save(message);
});

// Login to Discord with your client's token
client.login(token);

const Archivist = {
	save: (message) => {
		console.log(message);
		let parsedMessage = Archivist.parseMessage(message);
		console.log(parsedMessage);
	},

	// We try to extract multiple informations from the content:
	// - The title of the message
	// - The system used
	// - Any link to a package page
	// - The content of the message
	parseMessage: (message) => {
		//First we extract everything that comes before the following characters: ===
		let header = message.content.match(/(.*)===/);
		//Then we remove the ping to @Premium Content
		header.replace("@Premium Content", "");
		//Next, we extract the system used, between parenthesis
		let system = header.match(/\((.*)\)/);
		//And we trim it
		system = system.trim();
		//The finally we extract the title
		let title = header.replace(/\((.*)\)/, "");

		//Now we will look for links to package pages and append a link to the Foundry Hub page just before.
		//We'll also save the package names for later use.
		//Links to package page are in the form of https://foundryvtt.com/packages/NAME
		let packages = message.content.match(/https:\/\/foundryvtt.com\/packages\/(.*)/g);
		//We'll save the package names in an array
		let packageNames = [];
		packages.forEach((package) => {
			//We extract the package name
			let packageName = package.match(/https:\/\/foundryvtt.com\/packages\/(.*)/);
			//We append the link to the Foundry Hub page on the next line
			message.content.replace(package, package + "\nFoundry Hub: https://foundry-hub.com/package/" + packageName);
			//And we save the package name
			packageNames.push(packageName);
		});

		
		return {
			title: title,
			system: system,
			packages: packageNames,
			content: message.content
		} ;
	}
};

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