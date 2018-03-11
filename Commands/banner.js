/* Uncomment all of the DBL stuff when the bot gets verified, for now will be unblocked */

const request = require('superagent')
const {Attachment} = require('discord.js')
const DBL = require("dblapi.js");
const config = require('../config.json')
const dbl = new DBL(config.dbl);


module.exports = class Banner {
    constructor(client) {
      this.client = client;
      this.name = "banner";
      this.info = "Get a profile banner.";
      this.args = "";
    }
  
    async run(message, args) {
      let voted = await dbl.hasVoted(message.author.id)
      if(!voted) {
        message.channel.send(":x: You have to **upvote me** on Discord Bot List. Do `osu!upvote` for instructions.") 
      } else {
        message.channel.send({files: [new Attachment(`https://lemmmy.pw/osusig/sig.php?colour=pink&uname=${args}&pp=2&countryrank&flagstroke&darktriangles&onlineindicator=undefined&xpbar&xpbarhex`, `banner.png`)]})
      }
     
    }
  }
  