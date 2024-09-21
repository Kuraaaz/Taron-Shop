const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
  name: 'roleCreate',
  once: false,
  async execute(client, role) {
    try {
      const client = role.client;

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

      if (!role.guild) {
        console.log('La guilde n\'a pas pu être récupérée à partir du rôle.');
        role.guild = guild;
      }

      const logChannelId = '993857352950366290';

      const logChannel = guild.channels.cache.get(logChannelId);
      if (!logChannel) {
        console.log('Salon de log introuvable.');
        return;
      }

      const embed = new MessageEmbed()
        .setTitle('Nouveau Rôle Créé')
        .setDescription(`Un nouveau rôle a été créé : ${role.name}`)
        .setColor(role.color || '#3498db')
        .addFields(
          { name: '± Nom du rôle', value: role.name, inline: true },
          { name: '± ID du rôle', value: role.id, inline: true },
          { name: '± Couleur', value: role.hexColor, inline: true }
        )
        .setTimestamp()

      // Envoie de l'embed dans le salon de logs
      await logChannel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'envoi du message dans le salon de logs :', error);
    }
  }
};