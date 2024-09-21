const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
  name: 'messageDelete',
  once: false,
  async execute(client, message) {
    try {
      const client = message.client;
      if (!client) {
        console.log('Le client n\'est pas défini.');
        return;
      }

      if (!process.env.GUILD_ID) {
        console.log('La variable d\'environnement GUILD_ID n\'est pas définie.');
        return;
      }

      const guild = client.guilds.cache.get(process.env.GUILD_ID);
      if (!guild) {
        console.log('La guilde n\'a pas pu être récupérée à partir du cache du client.');
        return;
      }
      
      const linkRegex = /(https?:\/\/[^\s]+)/g;
      if (linkRegex.test(message.content)) {
        return;
      }

      const logChannelId = '1286939470989492224';

      const logChannel = guild.channels.cache.get(logChannelId);
      if (!logChannel) {
        console.log('Salon de log introuvable.');
        return;
      }

      const embed = new MessageEmbed()
        .setTitle('Message Supprimé')
        .setDescription(`Un message a été supprimé dans le salon <#${message.channel.id}>`)
        .setColor('#e74c3c')
        .addFields(
          { name: 'Auteur', value: message.author ? message.author.tag : 'Auteur inconnu', inline: true },
          { name: 'ID du message', value: message.id, inline: true },
          { name: 'Contenu', value: message.content || 'Aucun contenu', inline: false }
        )
        .setTimestamp();

      await logChannel.send({ embeds: [embed] });
    }
    catch (error) {
      console.error('Une erreur est survenue lors de l\'envoi du message dans le salon de logs :', error);
    }
  }
};
