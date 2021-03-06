exports.run = (client, msg, args) => {
  if (args.length < 1) return msg.reply('You must add a Number of the amount of to deleting messages behind!');
  if(!msg.member.hasPermission(8192)) return msg.reply("*You need a role that provide the right to Delete/Manage Messages!*")
  if(!msg.deletable) return msg.reply("I have no rights to delete Messages!")
  let messagecount = parseInt(args.join(' '), 10);
  if(isNaN(messagecount)) return msg.reply("This Command only accept numbers!")
  if(messagecount <= 1) return msg.reply("You must purge more than 1 Message!")
  if(messagecount > 100) return msg.reply("You can only delete 100 Messages at the time!")
  msg.channel.fetchMessages({'limit': messagecount}).then(messages => {
      msg.channel.bulkDelete(messages)
      .then(() => {
        msg.channel.send("i've deleted " + messages.size + " Messages")
        .then(message => message.delete(10000).catch())
      })
      .catch(() => {
          msg.channel.send("I may only delete Messages that are not older than 14 Days! thats is a Limit from Discord")
      })
     }
  )
  .catch(console.error);
};

exports.help = {
    'name': 'purge',
    'description': 'delete X amount of messages from the current channel ',
    'usage': 'purge <number>'
}

exports.alias = ["prune", "bulkdelete"]
