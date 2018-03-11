module.exports = class Support {
    constructor(client) {
      this.client = client;
      this.name = "support";
      this.info = "Get support for the bot.";
      this.args = "";
    }
  
    async run(message, args) {
      message.channel.sendMessage('https://discord.gg/uda4VuE')
    }
  }
  