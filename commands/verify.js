const config = require('../config.js');

module.exports = {
    config: {
        name: 'verify',
        aliases: ['v']
    },
    run: async (client, message, args) => {

        function catchErr (err, message) {
            message.channel.send(`There was an error executing this command.\n\`\`\`${err}\`\`\``)
        }

        try {
            let channel = client.channels.get(config.logs.command_log);
            await channel.send(`${message.author.tag} (ID: \`${message.author.id}\`) used the \`verify\` command in ${message.guild.name} (ID: \`${message.guild.id}\`).`);

            let verifylog = client.channels.get('656593843650822164');
            if(message.guild.id != '656233515813306398');
            if(message.member.roles.some((r) => ['Verified'].includes(r.name))) return;
            if(message.deletable) message.delete();
            await verifylog.send(`**${message.author.tag}** (ID: \`${message.author.id}\`) has successfully verified.`);
            await message.member.addRole('656594977815527434');
            await message.channel.send(`**${message.author.tag}**, you have successfully verified.`).then(m => m.delete(10000));
        }
        catch (err) {
            catchErr(err, message);
        }

    }

}