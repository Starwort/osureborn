module.exports = class Invite {
    constructor(client) {
      this.client = client;
      this.name = "invite";
      this.info = "Invite the bot to your server.";
      this.args = "";
    }
  
    async run(message, args) {
      message.channel.sendMessage('https://discordapp.com/oauth2/authorize?client_id=421879566265614337&scope=bot&permissions=3072')
    }
  }
  