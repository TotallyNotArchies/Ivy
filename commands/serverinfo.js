const config = require('../config.js');
const colours = require('../colours.js');
const { RichEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'serverinfo',
        aliases: ['si']
    },
    run: async (client, message, args) => {

        function catchErr (err, message) {
            message.channel.send(`There was an error executing this command.\n\`\`\`${err}\`\`\``)
        }

        try {

            let channel = client.channels.get(config.logs.command_log);
            await channel.send(`${message.author.tag} (ID: \`${message.author.id}\`) used the \`serverinfo\` command in ${message.guild.name} (ID: \`${message.guild.id}\`).`);

            function checkDays(date) {
                let now = new Date();
                let diff = now.getTime() - date.getTime();
                let days = Math.floor(diff / 86400000);
                return days + (days == 1 ? ' day' : ' days') + ' ago';
            };
            let verifLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵  ┻━┻', '┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻'];
            let region = {
                'brazil': 'Brazil',
                'europe': 'Europe',
                'singapore': 'Singapore',
                'us-central': 'US Central',
                'sydney': 'Sydney',
                'us-east': 'US East',
                'us-south': 'US South',
                'us-west': 'US West',
                'vip-us-east': 'VIP US East',
                'london': 'London',
                'amsterdam': 'Amsterdam',
                'hongkong': 'Hong Kong',
                'russia': 'Russia',
                'southafrica': 'South Africa'
            };
            let embed = new RichEmbed()
                .setAuthor('| Guild Information', message.author.displayAvatarURL)
                .setColor(colours.colours.invisible)
                .addField('Guild Name', message.guild.name, true)
                .addField('Guild ID', message.guild.id, true)
                .addField('Guild Owner', message.guild.owner.user.tag, true)
                .addField('Region', region[message.guild.region], true)
                .addField('Humans', message.guild.members.filter(member => !member.user.bot).size, true)
                .addField('Bots', message.guild.members.filter(member => member.user.bot).size, true)
                .addField('Verification Level', verifLevels[message.guild.verificationLevel], true)
                .addField('Channels', message.guild.channels.size, true)
                .addField('Roles', message.guild.roles.size, true)
                .addField('Creation Date', `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
                .setThumbnail(message.guild.iconURL)
                await message.channel.send(embed);
        }
        catch (err) {
            catchErr(err, message);
        }

    }

}