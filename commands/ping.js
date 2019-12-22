const config = require('../config.js');

module.exports = {
    config: {
        name: 'ping'
    },
    run: async (client, message, args) => {

        function catchErr (err, message) {
            message.channel.send(`There was an error executing this command.\n\`\`\`${err}\`\`\``)
        }

        try {
            let channel = client.channels.get(config.logs.command_log);
            await channel.send(`${message.author.tag} (ID: \`${message.author.id}\`) used the \`ping\` command in ${message.guild.name} (ID: \`${message.guild.id}\`).`);
            await message.channel.send('Pinging...').then(m => {
                let ping = m.createdTimestamp - message.createdTimestamp;
            m.edit(`Pong! Latency is \`${Math.round(client.ping)}ms\`. API Latency is \`${ping}ms\`.`)
            })
        }
        catch (err) {
            catchErr(err, message);
        }

    }

}