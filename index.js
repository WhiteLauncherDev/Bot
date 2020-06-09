const Discord = require('discord.js')
const client = new Discord.Client
let prefix = "wlb."

// Status
client.on("ready", () =>{
  client.user.setActivity('Minecraft', { type: 'PLAYING' });
})

 client.on('message', message => {
    if(message.content === prefix + 'toutou') {
      message.channel.send('https://bonbot.seyz.wtf/api/create?name=' + message.author.username + '&colors=Blue')
  }
})

// Commandes
client.on('message', function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)
  if (args[0].toLowerCase() === prefix + 'kick') {
    try{
      message.delete()
      if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande. ;(")
      const user = message.mentions.users.first()
      if(!user) return message.channel.send('Tu dois mentionner un utilisateur !')
      const member = message.guild.member(user)
      if (member.highestRole >= message.member.highestRole && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:.")
      if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglasses:.")
      member.kick()
      message.channel.send('**' + member.user.username + '** a été exclu :white_check_mark:.')

    }catch(e){
      message.channel.send(":x: Erreur. :x:\n"+e)
    }
  }
})

client.on('message', function (message) {
  if(message.content === prefix + "help") {
    try{
    let helpEmbed = new Discord.MessageEmbed
      helpEmbed.setDescription("Les commandes du Bot")
      helpEmbed.setColor("RANDOM")
      helpEmbed.addField('wlb.ban', 'Banni les pas-sages.')
      helpEmbed.addField('wlb.toutou', 'Bon toutou !')
      helpEmbed.addField('wlb.kick', 'Expulse les pas-sages.')
      message.channel.send(helpEmbed)
      message.delete()
  }catch(e){
      message.channel.send(":x: Erreur. :x:\n"+e)
    }
  }
})

client.on('message', function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)
  if (args[0].toLowerCase() === prefix + 'ban') {
    try{
      message.delete()
      if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande. ;(")
      const user = message.mentions.users.first()
      if(!user) return message.channel.send('Tu dois mentionner un utilisateur !')
      const member = message.guild.member(user)
      if (member.highestRole >= message.member.highestRole && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:.")
      if (!member.kickable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglasses:.")
      member.ban()
      message.channel.send('**' + member.user.username + '** a été banni :white_check_mark:.')
    }catch(e){
      message.channel.send(":x: Erreur. :x:\n"+e)
    }
  }
})



client.login(process.env.TOKEN)