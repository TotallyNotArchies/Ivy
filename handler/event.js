const config = require('../config.js');
const { readdirSync } = require('fs');

module.exports = (client) => {
    const events = readdirSync('./events/').filter(d => d.endsWith('.js'))
    for (let file of events) {
        const evt = require(`../events/${file}`)
        let eName = file.split('.')[0]
        client.on(eName, evt.bind(null, client))
    }

};