const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(client, message) {
    try {
      if (message.author.bot) return;

      const client = message.client;
      if (!client) {
        console.log('Le client n\'est pas défini.');
        return;
      }

      if (message.member.permissions.has('ADMINISTRATOR', process.env.MODO_ROLE)) return;

      if (!process.env.GUILD_ID) {
        console.log('La variable d\'environnement GUILD_ID n\'est pas définie.');
        return;
      }

      const guild = client.guilds.cache.get(process.env.GUILD_ID);
      if (!guild) {
        console.log('La guilde n\'a pas pu être récupérée à partir du cache du client.');
        return;
      }

      const logChannelId = '1286939470989492224';

      const logChannel = guild.channels.cache.get(logChannelId);
      if (!logChannel) {
        console.log('Salon de log introuvable.');
        return;
      }

      const linkRegex = /(https?:\/\/[^\s]+)/g;

      if (linkRegex.test(message.content)) {
        await message.delete();

        const embed = new MessageEmbed()
          .setTitle('Message contenant un lien supprimé')
          .setDescription(`Un message contenant un lien a été supprimé dans le salon <#${message.channel.id}>.`)
          .setColor('#e74c3c')
          .addFields(
            { name: 'Auteur', value: message.author.tag, inline: true },
            { name: 'ID du message', value: message.id, inline: true },
            { name: 'Contenu', value: message.content || 'Aucun contenu', inline: false }
          )
          .setTimestamp();

        await logChannel.send({ embeds: [embed] });
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de la suppression du message :', error);
    }
  }
};
