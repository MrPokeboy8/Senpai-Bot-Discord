const Discord                               = require('discord.js');
const WeatherApi                            = require('openweathermapapi')
const config                                = require('../../config/config.json');
exports.run = (client, msg, params) => {
    if(params.length === 0) return msg.reply("You must add a City for that command")
    const City  = params[0]
    const Key   = config.OWMApiKey
    WeatherApi.byName(City, Key)
        .then(result => {
                const embed = new Discord.RichEmbed()
                .setTitle(`Weather of ${result.city}`)
                .addField(`:cloud: ${result.weather.main} :cloud:`, `:closed_umbrella: ${result.weather.advanced} :closed_umbrella: `, true)
                .setColor("AQUA")
                .setTimestamp()
                msg.channel.send({embed})
            }
        )
        .catch( () => {
                msg.channel.send("Oh something went wrong! did you spell the City name right?")
            }
        )
}

exports.help = {
    'name': 'weather',
    'description': 'shows the weather of a city',
    'usage': 'weather [cityname]'
}

exports.alias = []
