const config = require('../config.js');

module.exports = {
    config: {
        name: 'invite'
    },
    run: async (client, message, args) => {

        function catchErr (err, message) {
            message.channel.send(`There was an error executing this command.\n\`\`\`${err}\`\`\``)
        }

        try {
            let channel = client.channels.get(config.logs.command_log);
            await channel.send(`${message.author.tag} (ID: \`${message.author.id}\`) used the \`invite\` command in ${message.guild.name} (ID: \`${message.guild.id}\`).`);
            await message.channel.send('To invite ' + client.user.username + ' use this link: <https://discordapp.com/oauth2/authorize?client_id=' + client.user.id + '&scope=bot&permissions=504753366>.');
        }
        catch (err) {
            catchErr(err, message);
        }

    }

}