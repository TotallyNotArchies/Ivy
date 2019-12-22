const config = require('../config.js');
const blacklist = require('../blacklist.js');

module.exports = async (client, message) => {

    let channel = client.channels.get(config.logs.ivy_log);

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return channel.send(`${message.author.tag} (ID: \`${message.author.id}\`) sent ||\`${message.content}\`|| in ${client.user.username}'s direct messages.`);

    const prefix = config.settings.defaultPrefix;
    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    const prefixRegex2 = new RegExp(`^(<@!?${client.user.id}>|)\\s*`);
    if(!prefixRegex.test(message.content)) return;
    if(!prefixRegex2.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);
    const [, mentionPrefix] = message.content.match(prefixRegex2);
    let args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(matchedPrefix)) return;

    let array1 = blacklist.users.userid;       
    if(array1.includes(message.author.id)) return message.channel.send(`You are blacklisted from using ${client.user.username}.`);
    let array2 = blacklist.guilds.guildid;
    if(array2.includes(message.guild.id)) return message.channel.send(`This server has been blacklisted from using ${client.user.username}.`);

    if(message.content == mentionPrefix) return message.channel.send(`Forgot my prefix? You can either mention me (\`@${client.user.username}\`) or use \`${config.settings.defaultPrefix}\`.`)
    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(commandFile) commandFile.run(client, message, args)

};