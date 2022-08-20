// Require the necessary discord.js classes
const { cleanContent, Client, GatewayIntentBits } = require('discord.js');
const showdown  = require('showdown');
showdown.setOption('simpleLineBreaks', true);
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', (message) => {
	console.log('Message received!');
	Archivist.save(message);
});

// Login to Discord with your client's token
client.login(token);

const Archivist = {
	save: (message) => {
		//console.log(message);
		if (message.channelId === '1001997037627256882') {
			let parsedMessage = Archivist.parseMessage(message);
			console.log(parsedMessage);
		}
	},

	// We try to extract multiple informations from the content:
	// - The title of the message
	// - The system used
	// - Any link to a package page
	// - The content of the message
	parseMessage: (message) => {
		//First we extract everything that comes before the following characters: ===
		let header = message.content.match(/(.*)===/m);
		console.log(message.content);
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

let test = {
	channelId: '1001997037627256882',
	guildId: '797906337409269760',
	id: '1009218282752061500',
	createdTimestamp: 1660686788977,
	type: 0,
	system: false,
	content: '**Foundry Virtual Tabletop - Version 10 Testing 4 (Build 278) Release**\n' +
	  '**===============================**\n' +
	  '```yaml\n' +
	  'IMPORTANT: As always, perform a backup of any critical user data before performing an update.\n' +
	  '```\n' +
	  "Hello @everyone, we are very pleased to announce the release of Foundry Virtual Tabletop Version 10 Testing 4. With V10's stable release approaching fast, this Testing release is focused on dealing with bugs and polishing up the user experience as much as possible. As a result, this release doesn't include a lot of flashy features but it does continue to sand off rough edges for developers and end users while still providing some new quality of life features for everyone.\n" +
	  '\n' +
	  '**User Experience.** This update includes a number of improvements to the user experience like making the Configure Settings UI match the design and functionality of the Package Management window with categories to the left and a filter at the top, ensuring that confirmation windows are always brought to the forefront, making the journal sidebar collapsible, more tooltips around the application, and adding support for a user list or user colored pips when collaboratively editing a Journal Entry Page.\n' 
  +
	  '\n' +
	  '**Enhancements to the API.** There have been a number of improvements to the API including adding the ability to clone any data model, exposing more ProseMirror functions to more easily manipulate editor state, build a data model from another data model, and the clean up of a lot of no longer needed code.\n' +
	  '\n' +
	  "**Bug Hunt** As per usual, the team has been hard at work tracking down bugs and taking care of 40 issues that have been raised by our community in this update alone. We'd like to extend a huge thank you to everyone who has shared a bug report, you're helping to make V10 an amazing launch!\n" +
	  '```yaml\n' +
	  'WARNING: Releases on the Testing channel have the potential to introduce bugs that may be disruptive to play. These features are close to a stable release - but likely to still include some bugs and incompatibilities which may frustrate you. While these releases are intended for testing by the average user, we do not recommend you use them yet in your long running campaigns. We instead ask you try them out in a new world or oneshot with no modules.\n' +
	  '```\n' +
	  'This update continues our Testing phase for Version 10 and is an ideal time for @Community Developer users to prepare packages for the forthcoming stable release.\n' +
	  '\n' +
	  '**Full Update Notes:** <https://foundryvtt.com/releases/10.278>\n' +
	  '**Testing Feedback Channels:** <#956307084931112960> , <#956306859491471420>, <#956243957816377414> \n' +
	  '**Download Instructions:** Download Version 10 Build 278 from <https://foundryvtt.com/me/licenses>',
	author:  {
	  id: '1001997187057713193',
	  bot: true,
	  system: false,
	  flags: null,
	  username: 'Foundry VTT #announcements',
	  discriminator: '0000',
	  avatar: 'fd92a10522374ef0ed215fa91cb8018b',
	  banner: undefined,
	  accentColor: undefined
	},
	pinned: false,
	tts: false,
	nonce: null,
	embeds: [],
	components: [],
	attachments: [{
	  '1009217634451070976' : {
		attachment: 'https://cdn.discordapp.com/attachments/675738274572271656/1009217634451070976/unknown.png',
		name: 'unknown.png',
		id: '1009217634451070976',
		size: 5617737,
		url: 'https://cdn.discordapp.com/attachments/675738274572271656/1009217634451070976/unknown.png',
		proxyURL: 'https://media.discordapp.net/attachments/675738274572271656/1009217634451070976/unknown.png',
		height: 1440,
		width: 3440,
		contentType: 'image/png',
		description: null,
		ephemeral: false
	  }
	}],
	editedTimestamp: null,
	webhookId: '1001997187057713193',
	groupActivityApplication: null,
	applicationId: null,
	activity: null,
	reference: {
	  channelId: '675738274572271656',
	  guildId: '170995199584108546',
	  messageId: '1009217636393046036'
	},
	interaction: null
  };


const converter = new showdown.Converter();
let html = converter.makeHtml(cleanContent(test.content, client.channels.get(test.channelId)));

const fs = require('fs');

try {
	fs.writeFileSync('./test.html', html);
	// file written successfully
	console.log("file written successfully");
  } catch (err) {
	console.error(err);
  }


//Archivist.save(test);