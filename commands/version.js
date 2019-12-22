const config = require('../config.js');
const { version } = require('../package.json');

module.exports = {
    config: {
        name: 'version'
    },
    run: async (client, message, args) => {

        function catchErr (err, message) {
            message.channel.send(`There was an error executing this command.\n\`\`\`${err}\`\`\``)
        }

        try {
            let channel = client.channels.get(config.logs.command_log);
            await channel.send(`${message.author.tag} (ID: \`${message.author.id}\`) used the \`version\` command in ${message.guild.name} (ID: \`${message.guild.id}\`).`);
            await message.channel.send(`${client.user.username}'s version is \`v${version}\`.`)
        }
        catch (err) {
            catchErr(err, message);
        }

    }

}