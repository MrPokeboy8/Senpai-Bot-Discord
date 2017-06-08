const rethink = require('rethinkdb');
const config  = require('../../config/config.json');

exports.run = async (client, msg) => {
    let currency = client.guilds.get("199857240037916672").emojis.get("322135966322262056")
    const connection = await rethink.connect()
    let user;
    if(msg.mentions.users.size < 1)
    {
        user = msg.author
    }else{
        user = msg.mentions.users.first()
    }
     rethink.db('Discord').table('economy')
    .get(user.id)
    .run(connection, (err, result) => {
        if (err) throw err
        if (result === null) return msg.reply(`looks like you or the user you mentioned haven't registered for the economy system yet you or the user can do that by writing ${config.prefix}register!`)
        let Cash = result.Cash;
        let Bank = result.Bank;
        let Total = Cash + Bank
        msg.reply(`You have ${Cash} ${currency} on your hand and ${Bank} ${currency} in the Bank thats a Total of ${Total} ${currency}. Good on you!`)
    })
}

exports.help = {
    'name': 'Money',
    'description': 'shows your current money or the money of someone you mention',
    'usage': 'money [@user]',
}

exports.alias = ["cash", "current"]
