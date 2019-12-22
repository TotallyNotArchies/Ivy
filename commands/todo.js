const config = require('../config.js');
const colours = require('../colours.js');
const { RichEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'todo'
    },
    run: async (client, message, args) => {

        function catchErr (err, message) {
            message.channel.send(`There was an error executing this command.\n\`\`\`${err}\`\`\``)
        }

        try {

            let channel = client.channels.get(config.logs.command_log);
            await channel.send(`${message.author.tag} (ID: \`${message.author.id}\`) used the \`eval\` command in ${message.guild.name} (ID: \`${message.guild.id}\`).`);

            let todoEmbed = new RichEmbed()
            .setAuthor('| To Do List', message.author.displayAvatarURL)
            .setColor(colours.colours.invisible)
            .setDescription('`1.` Add information commands.\n`2.` Add developer commands.')
            await message.channel.send(todoEmbed);
        }
        catch (err) {
            catchErr(err, message);
        }

    }

}