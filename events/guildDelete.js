const config = require('../config.js');
const colours = require('../colours.js');
const { RichEmbed } = require('discord.js');

module.exports = async (client, guild, message) => {

    let channel = client.channels.get(config.logs.guild_log)

    let gCEmbed = new RichEmbed()
    .setAuthor('| Guild Leave', client.user.displayAvatarURL)
    .setColor(colours.colours.red)
    .addField('Guild', `${guild.name} (ID: ${guild.id})`)
    .addField('Guild Owner', `${guild.owner.user.tag} (ID: ${guild.owner.id})`)
    .setTimestamp()

    channel.send(gCEmbed)

};