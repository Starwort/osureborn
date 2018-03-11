const { RichEmbed } = require('discord.js')

// Beatmap {
//   id: '765567',
//   hash: '49ae1a43f732d07aff8efab2b0f22bdf',
//   title: 'GATE~Sore wa Akatsuki no you ni~ (TV size)',
//   creator: 'Del05',
//   version: 'Insane',
//   source: 'GATE 自衛隊 彼の地にて、斯く戦えり',
//   artist: 'KISIDA KYODAN & THE AKEBOSI ROCKETS',
//   genre: 'Anime',
//   language: 'Japanese',
//   bpm: '200',
//   mode: 'Standard',
//   tags: 
//    [ 'jieitai',
//      'kanochi',
//      'nite',
//      'kaku',
//      'tatakaeri',
//      'opening',
//      'kyle',
//      'y',
//      'walaowey',
//      'rory',
//      'tuka',
//      'ゲート' ],
//   approvalStatus: 'Ranked',
//   raw_approvedDate: '2016-03-19 02:21:22',
//   raw_lastUpdate: '2016-03-02 23:14:22',
//   beatmapSetId: '346872',
//   maxCombo: '549',
//   difficulty: 
//    { rating: '4.496906757354736',
//      size: '4',
//      overall: '7',
//      approach: '9',
//      drain: '6' },
//   time: { total: '89', drain: '89' },
//   counts: 
//    { favorites: '787',
//      favourites: '787',
//      plays: '992581',
//      passes: '169665' } } ]



module.exports = class Beatmap {
    constructor(client) {
      this.client = client;
      this.name = "beatmap";
      this.info = "Finds information about an osu! beatmap.";
      this.args = "";
    }
  
    async run(message, args) {
      if(!args) return message.channel.send(`:x: **No arguments**.`)
      this.client.osu.getBeatmaps({b: args}).then(b => {
        if(!b.title) return message.channel.send(`:question: **Beatmap not found**.`)
        const embed = new RichEmbed()
        .setColor(0xBE1B7D)
        .setTitle(`osu! beatmap - ${b[0].title}`)
        .addField(`map info`, `creator - ${b[0].creator}\napproval status: ${b[0].approvalStatus}\nplays - ${b[0].counts.plays}\npasses - ${b[0].counts.passes}`, true)
        .addField(`song info`, `source - ${b[0].source}\nartist - ${b[0].artist}\ngenre - ${b[0].genre}\nlanguage - ${b[0].language}`, true)
        .addField(`gameplay info`, `max combo - ${b[0].maxCombo}\ntotal time - ${b[0].time.total}\ndifficulty rating - ${b[0].difficulty.rating}`, true)
        .setURL(`https://osu.ppy.sh/s/${b[0].id}`)
        message.channel.send(embed)
      })
    }
  }