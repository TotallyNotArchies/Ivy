const config = require('../config.js');
const { RichEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'roleinfo',
        aliases: ['ri']
    },
    run: async (client, message, args) => {

        function catchErr (err, message) {
            message.channel.send(`There was an error executing this command.\n\`\`\`${err}\`\`\``)
        }

        try {

            let channel = client.channels.get(config.logs.command_log);
            await channel.send(`${message.author.tag} (ID: \`${message.author.id}\`) used the \`roleinfo\` command in ${message.guild.name} (ID: \`${message.guild.id}\`).`);

            function checkDays(date) {
                let now = new Date();
                let diff = now.getTime() - date.getTime();
                let days = Math.floor(diff / 86400000);
                return days + (days == 1 ? ' day' : ' days') + ' ago';
            };

            let role = args.join(' ');
            if(!role){
                await message.channel.send('Please specify a role.');
                return;
            }
            let gRole = message.guild.roles.find(r => r.name === role);
            if(!gRole){
                await message.channel.send('Unable to find role with the name of `' + role + '` in this server.');
                return;
            }
            const status = {
                false: 'No',
                true: 'True'
              };

            let embed = new RichEmbed()
                .setAuthor('| Role Information', message.author.displayAvatarURL)
                .setColor(gRole.hexColor)
                .addField('Name', gRole.name, true)
                .addField('ID', gRole.id, true)
                .addField('Mention', '<@&' + gRole.id + '>', true)
                .addField('Hex', gRole.hexColor, true)
                .addField('Members', gRole.members.size, true)
                .addField('Position', gRole.position, true)
                .addField('Hoisted', status[gRole.hoist], true)
                .addField('Mentionable', status[gRole.mentionable], true)
                .addField('Creation Date', `${gRole.createdAt.toUTCString().substr(0, 16)} (${checkDays(gRole.createdAt)})`, true)
                await message.channel.send(embed);
        }
        catch (err) {
            catchErr(err, message);
        }

    }

}