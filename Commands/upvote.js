module.exports = class Upvote {
    constructor(client) {
      this.client = client;
      this.name = "upvote";
      this.info = "Upvote the bot for access to other commands.";
      this.args = "";
    }
  
    async run(message, args) {
      message.channel.send("If you want access to the command `osu!banner`, go ahead and upvote the bot at https://discordbots.org/bot/421879566265614337 for access to it.")
    }
  }