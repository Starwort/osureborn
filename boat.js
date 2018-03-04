const Discord = require('discord.js')
const chalk  = require('chalk')
const events = require('./Modules/Events.js');
const osu = require('node-osu')

const client = new class Client extends Discord.Client {
  constructor() {
    super();

    this.events   = new events(this)
    this.commands = new Map();
    this.osu      = new osu.Api('7520b4755cfd7161b3da85be693bea51e49ba412', {
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
