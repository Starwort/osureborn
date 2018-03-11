const fs = require('fs');
const config = require('../config.json')
const Chalk  = require('chalk')
const request = require('superagent')
const DBL = require("dblapi.js");
const dbl = new DBL(config.dbl, this.client);

module.exports = class Events {
    constructor(client) {
        this.client = client;
    }

    ready() {
        request
            .post(`https://bots.discord.pw/api/bots/421879566265614337/stats`)
            .set('Authorization', config.pw)
            .send({server_count: this.client.guilds.size})
            .end((err, res) => {
                this.log(`Posted stats to bots.discord.pw.`)
              });
        this.log('Ready!');
        this.client.user.setActivity(`osu!help | ${this.client.guilds.size} guilds`);
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

    async guildCreate(guild) {
        request
            .post(`https://bots.discord.pw/api/bots/421879566265614337/stats`)
            .set('Authorization', config.pw)
            .send({server_count: this.client.guilds.size})
            .end((err, res) => {
                this.log(`Posted stats to bots.discord.pw.`)
              });
        this.client.channels.get('422420738616721418').send(`:inbox_tray: Joined guild **${guild.name}**. Total guilds: ${this.client.guilds.size}`)
        this.client.user.setActivity(`osu!help | ${this.client.guilds.size} guilds`);
    }

    async guildDelete(guild) {
        request
            .post(`https://bots.discord.pw/api/bots/421879566265614337/stats`)
            .set('Authorization', config.pw)
            .send({server_count: this.client.guilds.size})
            .end((err, res) => {
                this.log(`Posted stats to bots.discord.pw.`)
              });
        this.client.channels.get('422420738616721418').send(`:outbox_tray: Left guild **${guild.name}**. Total guilds: ${this.client.guilds.size}`)
        this.client.user.setActivity(`osu!help | ${this.client.guilds.size} guilds`);
    }

    
    log(text, type) {
      if(!type) console.log(`${Chalk.bgGreen(new Date().toUTCString())} ${text}`);
      if(type == 'warn') console.log(`${Chalk.bgYellow(new Date().toUTCString())} ${text}`);
      if(type == 'error') console.log(`${Chalk.bgRed(new Date().toUTCString())} ${text}`);
      if(type == 'cmd') console.log(`${Chalk.bgBlue(new Date().toUTCString())} ${text}`);
      if(type == 'db') console.log(`${Chalk.bgMagenta(new Date().toUTCString())} ${text}`);
    }
}
