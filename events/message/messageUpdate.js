const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
  name: 'messageUpdate',
  once: false,
  async execute(client, oldMessage, newMessage) {
    try {
      const client = oldMessage.client;
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

      const logChannelId = '1285800827617017926';

      const logChannel = guild.channels.cache.get(logChannelId);
      if (!logChannel) {
        console.log('Salon de log introuvable.');
        return;
      }

      const embed = new MessageEmbed()
        .setTitle('Message Modifié')
        .setDescription(`Un message a été modifié dans le salon <#${newMessage.channel.id}>`)
        .setColor('#f1c40f')
        .addFields(
          { name: 'Auteur', value: newMessage.author ? newMessage.author.tag : 'Auteur inconnu', inline: true },
          { name: 'ID du message', value: newMessage.id, inline: true },
          { name: '- Avant', value: oldMessage.content || 'Aucun contenu', inline: false },
          { name: '- Après', value: newMessage.content || 'Aucun contenu', inline: false }
        )
        .setTimestamp();

      await logChannel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'envoi du message dans le salon de logs :', error);
    }
  }
};
