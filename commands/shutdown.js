const config = require('../config.js');

module.exports = {
    config: {
        name: 'shutdown'
    },
    run: async (client, message, args) => {

        function catchErr (err, message) {
            message.channel.send(`There was an error executing this command.\n\`\`\`${err}\`\`\``)
        }

        try {
            let channel = client.channels.get(config.logs.command_log);
            await channel.send(`${message.author.tag} (ID: \`${message.author.id}\`) used the \`shutdown\` command in ${message.guild.name} (ID: \`${message.guild.id}\`).`);
            await message.channel.send('Successfully shut down ' + client.user.username + '.');
            process.kill();
        }
        catch (err) {
            catchErr(err, message);
        }

    }

}