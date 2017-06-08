const Discord = require('discord.js');
exports.run = (client, msg, args) => {
    function nameTest(channel) {
        return channel.name.toLowerCase().startsWith("log")
    }
     async function ban(member, reason, channel) {
        const message = await channel.send(`trying to ban ${member.user.tag}`)
        const ban = await member.ban({
                reason,
                "days": 7
        })
        const newMessage = await message.edit(`successfully banned ${member.user.tag}`)
        const embed = new Discord.RichEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setColor(0x00AE86)
            .setTimestamp()
            .addField("Command", "Ban")
            .addField("Member", `${member.user.tag} (${member.user.id})`)
            .addField("Reason", reason)

        if (msg.guild.channels.find(nameTest)) {
            msg.guild.channels.find(nameTest).send({embed})
            } else {
            msg.guild.defaultChannel.send("i dont found a channel that has a name started with log.\nCreate one so my Logs will be seperated from a normal Chat channel!", {embed})
        }
    }
    let reason = args.slice(1).join(' ');
    let member   = msg.mentions.members.first()
    if(msg.channel.type != "text") return msg.channel.send("You can run this command only on a Server!")
    if(!msg.member.hasPermission(4)) return msg.reply("*You need a role that provide the right to ban People!*")
    if (msg.mentions.members.size < 1) return msg.reply('You must mention someone for this Command.')
    if (!member.bannable) return msg.reply('I have no rights to ban that User');
    if (reason.length < 1) return msg.reply('You must supply a reason for the ban.');

    ban(member, reason, msg.channel)
}

exports.help = {
    'name': 'ban',
    'description': 'bans the mentioned user',
    'usage': 'ban [@user] [reason]'
}

exports.alias = ["banne", "banhammer"]
