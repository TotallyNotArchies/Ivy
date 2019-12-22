const config = require('../config.js');
const colours = require('../colours.js');
const { getMember, formatDate } = require('../functions.js');
const { RichEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'userinfo',
        aliases: ['ui']
    },
    run: async (client, message, args) => {

        function catchErr (err, message) {
            message.channel.send(`There was an error executing this command.\n\`\`\`${err}\`\`\``)
        }

        try {

            let channel = client.channels.get(config.logs.command_log);
            await channel.send(`${message.author.tag} (ID: \`${message.author.id}\`) used the \`userinfo\` command in ${message.guild.name} (ID: \`${message.guild.id}\`).`);

            const member = getMember(message, args.join(" "));

            const joined = formatDate(member.joinedAt);
            const roles = member.roles
                .filter(r => r.id !== message.guild.id)
                .map(r => r)
                .join(", ") || "none";
    
            const created = formatDate(member.user.createdAt);
    
            const embed = new RichEmbed()
                .setAuthor('| User Information', member.displayAvatarURL)
                .setThumbnail(member.user.displayAvatarURL)
                .setColor(colours.colours.invisible)
                .addField('Username', `${message.author.username}`, true)
                .addField('Discriminator', `${message.author.discriminator}`, true)
                .addField('Roles', `${roles}`, true)
                .addField('Joined', `${joined}`, true)
                .addField('Created', `${created}`, true)
                .setFooter(`Requested by ${message.author.tag} (${message.author.id})`)
                .setTimestamp()
    
                if (member.user.presence.game)
                    embed.addField('Currently playing', `${member.user.presence.game.name}`, true)
    
                    await message.channel.send(embed);
        }
        catch (err) {
            catchErr(err, message);
        }

    }

}