const config = require('../config.js');
const colours = require('../colours.js');
const { RichEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'help',
        aliases: ['h']
    },
    run: async (client, message, args) => {

        function catchErr (err, message) {
            message.channel.send(`There was an error executing this command.\n\`\`\`${err}\`\`\``)
        }

        try {

            let channel = client.channels.get(config.logs.command_log);
            await channel.send(`${message.author.tag} (ID: \`${message.author.id}\`) used the \`help\` command in ${message.guild.name} (ID: \`${message.guild.id}\`).`);

            let helpEmbed = new RichEmbed()
            .setAuthor('| Help', message.author.displayAvatarURL)
            .setColor(colours.colours.invisible)
            .addField('Information', '`help`, `invite`, `ping`, `roleinfo`, `serverinfo`, `todo`, `userinfo`, `version`')
            .addField('Developer', '`eval`, `reload`, `shutdown`')
            await message.channel.send(helpEmbed);
        }
        catch (err) {
            catchErr(err, message);
        }

    }

}