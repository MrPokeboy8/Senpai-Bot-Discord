exports.run = (client, msg, args) => {
  if (args.length < 1) return msg.reply('You must add a Number of the amount of to deleting messages behind!');
  if(!msg.member.hasPermission(8192)) return msg.reply("*You need a role that provide the right to Delete/Manage Messages!*")
  if(!msg.deletable) return msg.reply("I have no rights to delete Messages!")
  let messagecount = parseInt(args.join(' '), 10);
  if(messagecount > 100) return msg.reply("You can only delete 100 Messages at the time!")
  msg.channel.fetchMessages({'limit': messagecount}).then(messages => {
      msg.channel.bulkDelete(messages)
      msg.channel.sendMessage("i've deleted " + messages.size + " Messages")
      .then(message => message.delete(10000))
     }
  )
  .catch(console.error);
  console.log("[Command]     ", msg.author.username + "/" + msg.author.id, "(" + msg.content + ")")
};

exports.help = {
    'name': 'purge',
    'description': 'Purges X amount of messages from the current channel ',
    'usage': 'purge <number>'
}