const fs = require('fs');
const config = require('../config.json')
const allowed = {}
const Chalk  = require('chalk')

module.exports = class Events {
    constructor(client) {
        this.client = client;
    }

    ready() {
        this.log('Ready!');
        this.client.user.setGame(`0x0.party`);
        const commands = fs.readdirSync(`./commands/`);
        for (const command in commands) {

            const mod = new(require(`../commands/${commands[command]}`))(this.client);
            this.log(`Loaded ${mod.name}.`, "cmd")
            this.client.commands.set(mod.name, require(`../commands/${commands[command]}`))
        }
    }

    async message(message) {
        if (message.content.startsWith(config.prefix)) {
            let command = message.content.substr(config.prefix.length).split(" ")[0];
            let args = message.content.substr(config.prefix.length + command.length + 1)
            // console.log(command, args)
            if (this.client.commands.get(command)) {
                try {
                    await new(this.client.commands.get(command))(this.client).run(message, args);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }

    
    log(text, type) {
      if(!type) console.log(`${Chalk.bgGreen(new Date().toUTCString())} ${text}`);
      if(type == 'warn') console.log(`${Chalk.bgYellow(new Date().toUTCString())} ${text}`);
      if(type == 'error') console.log(`${Chalk.bgRed(new Date().toUTCString())} ${text}`);
      if(type == 'cmd') console.log(`${Chalk.bgBlue(new Date().toUTCString())} ${text}`);
      if(type == 'db') console.log(`${Chalk.bgMagenta(new Date().toUTCString())} ${text}`);
    }
}
