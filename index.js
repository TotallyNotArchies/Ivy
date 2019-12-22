const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.js');

['commands', 'aliases'].forEach(x => client[x] = new Collection());
['console', 'event', 'command'].forEach(x => require(`./handler/${x}`)(client));

client.login(config.credentials.client_token);  