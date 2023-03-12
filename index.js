//setting up dotenv
require("dotenv").config();

const {Client, GatewayIntentBits, Collection} = require('discord.js');
const {Player} = require('discord-player');

//Setting up token from .env file
const { token } = process.env.DISCORD_TOKEN;

// New client instance
const client = new Client({
	intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildVoiceStates,],
});

//Initiazing player instance
const player = Player.singleton(client);

const fs = require('node:fs');
const path = require('node:path');

let commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

client.commands = new Collection();
//add the commands to the Collenciton, only .js files in commands folder
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

//event handling
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		player.events.on(event.name, async (...args) => await event.execute(...args));
		client.on(event.name, (...args) => event.execute(...args));
	}
}
client.login(token);
