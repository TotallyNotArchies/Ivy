const config = require('../config.js');

module.exports = (client) => {

    let prompt = process.openStdin()
    prompt.addListener('data', res => {
        let x = res.toString().trim().split(/ +/g)
        client.channels.get(config.logs.console_log).send(`**Console Message**\n\`\`\`${x.join(' ')}\`\`\``);
    });

};