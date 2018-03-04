const { RichEmbed } = require('discord.js')

// id: '9760086',
//   name: 'S0ck',
//   counts: 
//    { '50': '495',
//      '100': '2903',
//      '300': '24664',
//      SS: '18',
//      S: '15',
//      A: '9',
//      plays: '438' },
//   scores: { ranked: '25545972', total: '60436677' },
//   pp: { raw: '185.424', rank: '790259', countryRank: '111254' },
//   country: 'US',
//   level: '21.1037',
//   accuracy: '96.23111724853516',
//   events: [] }



module.exports = class User {
    constructor(client) {
      this.client = client;
      this.name = "user";
      this.info = "Get information about an osu! player.";
      this.args = "username";
    }
  
    async run(message, args) {
        if(!args) return message.channel.send(`:x: **No arguments**.`)
        this.client.osu.getUser({u: args}).then(user => {
            if(!user.id) return message.channel.send(`:question: **User not found**.`)
            const embed = new RichEmbed()
            .setColor(0xBE1B7D)
            .setTitle(`osu! user - ${user.name}`)
            .addField(`user info`, `id - ${user.id}\nlevel - ${user.level}\ncountry - ${user.country}\naccuracy - ${Math.round(user.accuracy, 3)}%`, true)
            .addField(`play stats`, `pp - ${user.pp.raw}\n    global ranking #${user.pp.rank}\n    country ranking #${user.pp.countryRank}\n${user.counts.SS} SS's, ${user.counts.S} S's, ${user.counts.A} A's`, true)
            .setFooter(`total plays: ${user.counts.plays}`)
            .setURL(`https://osu.ppy.sh/users/${args}`)
            message.channel.send(embed)
        })
    }
  }
  