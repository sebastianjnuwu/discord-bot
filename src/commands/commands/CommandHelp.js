//Importing the packages used in this command!
const Discord = require("discord.js");

//Import module accepted by hadler!
module.exports = {   
  name: "ajuda",
  aliases: ['help','ajuda'],
  run: async(client, message) => {

  //We define the message in embed!
  let help = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .setTitle("<:K_Confirmado:947545327374843965> Ajuda da Kelly")
	     .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
       .setDescription(`Ola ${message.author} meu nome é **KellyWorld**, mais você pode também me chamar de _"Kelly"_, eu sou um ser que sonha com a paz, Às vezes ela demora pra acontecer, às vezes não acontece. Mas você tem que acordar.`)
       .addFields(
		{ name: '<:K_:947545349151653898> Quer ver algumas das coisas que eu fasso?', value: '"Com grandes poderes vêm grandes responsabilidades_"\n\n<:K_morri:927681449929359410> Veja alguns dos meus comandos clicando [aqui](https://github.com/sebastianjnuwu/KellyWorld#-commands) são muitos não consigo lembrar de todos.' },
	)
       
      message.reply({ embeds: [help] });
  }
  //is this the end of the code? yes it is the end of the code! 
};