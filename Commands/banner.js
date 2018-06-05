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
      } else { //std=0, taiko=1, ctb=2, mania=3
        //request arg &mode={x}
        var arglist = args.split(" ");
        arglist[0] = arglist[0].toLowerCase()
        var mode = 4;
        if (arglist[0] == "std" || arglist[0] == "standard" || arglist[0] == "osu!std" || arglist[0] == "osu!standard"){
          mode = 0;
        } else if (arglist[0] == "taiko" || arglist[0] == "osu!taiko"){
          mode = 1;
        } else if (arglist[0] == "ctb" || arglist[0] == "osu!ctb" || arglist[0] == "osu!catch" || arglist[0] == "catch"){
          mode = 2;
        } else if (arglist[0] == "mania" || arglist[0] == "osu!mania"){
          mode = 3;
        }
        if (mode != 4){
          args = arglist.slice(1).join(" ")
        } else {
          mode = 0;
        }
        message.channel.send({files: [new Attachment(`https://lemmmy.pw/osusig/sig.php?colour=pink&mode=${mode}&uname=${args}&pp=2&countryrank&flagstroke&darktriangles&onlineindicator=undefined&xpbar&xpbarhex`, `banner.png`)]})
      }
     
    }
  }
  
