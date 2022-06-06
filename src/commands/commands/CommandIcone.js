//packages used in command
const Discord = require("discord.js");

//import module supported by hadler
module.exports = {
   name: "icon",
    aliases: ["icon"],
  run: async (client, message, args) => {
  const sicon = message.guild.iconURL({ dynamic : true, format: "png", size: 1024});
  const svicon = message.guild.iconURL()

  const embed = new Discord.MessageEmbed()
   .setTitle(`Ícone do servidor:`)
    .setDescription(`[Link da imagem aqui](${sicon})`)
    .setImage(sicon)
    .setColor('#ef00ff')
    

  await message.reply({ embeds: [embed] })
}
    }