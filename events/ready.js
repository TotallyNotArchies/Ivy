const config = require('../config.js');
const chalk = require('chalk');

module.exports = async client => {
    
    console.log(chalk.green(`[CLIENT CONNECT] ${client.user.tag} (ID: ${client.user.id}) has successfully connected to Discord`));
    client.user.setPresence({ game: { name: client.guilds.size + ' guilds', type: 'WATCHING' } });
    client.user.setStatus('online');

};