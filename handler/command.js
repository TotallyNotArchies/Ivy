const config = require('../config.js');
const { readdirSync } = require('fs');

module.exports = (bot) => {
        const commands = readdirSync(`./commands`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/${file}`);
            bot.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
        };
};