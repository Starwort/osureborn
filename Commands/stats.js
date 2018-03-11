const {RichEmbed} = require('discord.js')

module.exports = class Stats {
    constructor(client) {
      this.client = client;
      this.name = "stats";
      this.info = "Get the stats of the bot.";
      this.args = "";
    }
  
    async run(message, args) {
            const embed = new RichEmbed()
            .setColor(0xBE1B7D)
            .setTitle(`osu!bot stats`)
            .setDescription(`guilds: ${this.client.guilds.size}\nuptime: ${Math.round(this.client.uptime / (1000 * 60 * 60))} hours, ${Math.round(this.client.uptime / (1000 * 60)) % 60} minutes, and ${Math.round(this.client.uptime / 1000) % 60} seconds\nmem usage: ${(process.memoryUsage().rss / 1024 / 1024).toString().split(".")[0]} MiB`)
            .setFooter(`Donate: https://www.patreon.com/j9ck`)
            message.channel.send(embed)
    }
  }