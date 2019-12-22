const config = require('../config.js');
const colours = require('../colours.js');
const { RichEmbed } = require('discord.js');
const util = require('util');

module.exports = {
    config: {
        name: 'eval',
        aliases: ['e']
    },
    run: async (client, message, args) => {

        function catchErr (err, message) {
            message.channel.send(`There was an error executing this command.\n\`\`\`${err}\`\`\``)
        }

        try {

            let channel = client.channels.get(config.logs.command_log);
            await channel.send(`${message.author.tag} (ID: \`${message.author.id}\`) used the \`eval\` command in ${message.guild.name} (ID: \`${message.guild.id}\`).`);

            let array = config.id.bot_owner;
            if(!array.includes(message.author.id)) return;

            let toEval = args.join(' ')
            let evaluated = util.inspect(eval(toEval, { depth: 0 }));
            if (!toEval) return message.channel.send('Error while evaluating: `cannot evaluate air`.');
            let hrStart = process.hrtime()
            let hrDiff;
            hrDiff = process.hrtime(hrStart);

            let evalEmbed = new RichEmbed()
            .setAuthor('| Eval', message.author.displayAvatarURL)
            .setDescription(`Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.`)
            .setColor(colours.colours.invisible)
            .addField('Input', `\`\`\`js\n${toEval}\n\`\`\``)
            .addField('Output', `\`\`\`js\n${evaluated}\n\`\`\``)
            await message.channel.send(evalEmbed)
        }
        catch (err) {
            catchErr(err, message);
        }

    }

}