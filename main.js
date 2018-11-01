const Discord = require('discord.js');

var bot = new Discord.Client();
var prefix = ("k!");
var fs = require('fs');


var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

function userInfo(user) {
  var finalString = '';
  finalString += '' + user.username + 'avec ID **' + user.id + '**';
  var userCreated = user.createdAt.toString().split(' ');
  finalString += ' a été crée le ' + userCreated[2] + ' ' + userCreated[1] + ' ' + userCreated[3] + '.'
  finalString += '\nDepuis, il a envoyé ' + userData[user.id].messagesSent + ' messages sur ce serveur.'
  return finalString;
}

bot.on('ready', () => {
  bot.user.setPresence({ game: { name: '[k!help] KevFunBot'} });
  console.log("Le bot est prêt à être utilisé !");
});



bot.on('message', message => {
  
  var sender = message.author;
  var msg = message.content.toUpperCase();


  //ping
  if (message.content === prefix + "ping"){
    var ping_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField(':ping_pong: Pong ! ' + Math.round(bot.ping) + 'ms')
    message.channel.sendEmbed(ping_embed);
    console.log('ping pong');
  }

  //userinfo

  if (message.content.startsWith(prefix + 'userinfo')) {
    if (message.content === prefix + 'userinfo') {
      message.channel.send(userInfo(sender));
    }
  }

  //USERDATA

  if (message.content === prefix + 'stats') {
    message.channel.send('Vous avez envoyé **' + userData[sender.id].messagesSent + '** messages sur ce serveur !')
  }

  if (!userData[sender.id]) userData[sender.id] = {
    messagesSent: 0
  }

  userData[sender.id].messagesSent++;

  fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
    if (err) console.error(err);
  });
 
});


//autorole et message de join

  bot.on('guildMemberAdd', member => {
  console.log('User' + member.user.username + 'has joined the server !')
  var role = member.guild.roles.find('name', 'autorolekfb');
  member.addRole(role)
  member.guild.channels.get('472951962111967252').send('**' + member.user.username + '** a rejoint le serveur !');
});

//message de leave

bot.on('guildMemberRemove', member => {
  member.guild.channels.get('472951962111967252').send('**' + member.user.username + '** a quitté le serveur !')
});


bot.login('MzkzMDY5Nzc0ODg1NzQ4NzQ3.DrxiWw.jDbjd-CmASV4KMptDBXgs3DISuE');
