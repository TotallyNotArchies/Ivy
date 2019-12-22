const config = require('../config.js');

module.exports = {
    config: {
        name: 'reload'
    },
    run: async (client, message, args) => {

        function catchErr (err, message) {
            message.channel.send(`There was an error executing this command.\n\`\`\`${err}\`\`\``)
        }

        try {
            let channel = client.channels.get(config.logs.command_log);
            await channel.send(`${message.author.tag} (ID: \`${message.author.id}\`) used the \`reload\` command in ${message.guild.name} (ID: \`${message.guild.id}\`).`);

            let array = config.id.bot_owner;
            if(!array.includes(message.author.id)) return;

            if(!args[0]){
                await message.channel.send('Please specify a command to reload.');
                return;
            };
            let commandName = args[0].toLowerCase();
            try {
                await delete require.cache[require.resolve(`./${commandName}.js`)];
                await bot.commands.delete(commandName);
                const pull = require(`${commandName}.js`);
                await bot.commands.set(commandName, pull);
            } catch(e) {
                await message.channel.send('Unable to reload `' + commandName.toUpperCase() + '`.');
                return;
            }

            await message.channel.send('Successfully reloaded the `' + commandName.toUpperCase() + '` command.')
        }
        catch (err) {
            catchErr(err, message);
        }

    }

}