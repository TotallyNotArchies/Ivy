const config = require('../config.js');
const colours = require('../colours.js');
const { RichEmbed } = require('discord.js');

module.exports = async (client, guild, message) => {

    let channel = client.channels.get(config.logs.guild_log)

    let gCEmbed = new RichEmbed()
    .setAuthor('| Guild Join', client.user.displayAvatarURL)
    .setColor(colours.colours.green)
    .addField('Guild', `${guild.name} (ID: ${guild.id})`)
    .addField('Guild Owner', `${guild.owner.user.tag} (ID: ${guild.owner.id})`)
    .setTimestamp()

    channel.send(gCEmbed)
    // guild.owner.send(`Thank you for adding ${client.user.username} to your guild (${guild.name})! To view my commands type \`${config.settings.prefix}help\`. If you need support, type \`${config.settings.prefix}support\` for an invite to ${client.user.username}'s support server.`)

};