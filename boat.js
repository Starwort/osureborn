const Discord = require('discord.js')
const chalk  = require('chalk')
const events = require('./modules/Events.js');
const osu = require('node-osu')

const client = new class Client extends Discord.Client {
  constructor() {
    super();

    this.events   = new events(this)
    this.commands = new Map();
    this.osu      = new osu.Api(require('./config.json').osu, {
      // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
      notFoundAsError: false, // Reject on not found instead of returning nothing. (default: true)
      completeScores: false // When fetching scores also return the beatmap (default: false)
  })

    // Event Handling
    this.on('ready', () => {
      this.events.ready();
    })
    this.on('message', message => {
      this.events.message(message);
    })
    this.on('guildCreate', guild => {
      this.events.guildCreate(guild);
    })
    this.on('guildDelete', guild => {
      this.events.guildDelete(guild);
    })
    this.on('error', error => {
      console.error(error);
    })
    this.on('warn', error => {
      console.warn(error)
    })

    // Login
    this.login(require('./config.json').token);

  }

}

process.on('unhandledRejection', err => console.error(err))
