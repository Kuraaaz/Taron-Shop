const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
  name: 'roleUpdate',
  once: false,
  async execute(client, oldRole, newRole) {
    try {
      // Assure-toi que le client est disponible
      const client = oldRole.client;
      if (!client) {
        console.log('Le client n\'est pas défini.');
        return;
      }

      // Vérifie que la variable d'environnement GUILD_ID est définie
      if (!process.env.GUILD_ID) {
        console.log('La variable d\'environnement GUILD_ID n\'est pas définie.');
        return;
      }

      // Accède à la guilde à partir du cache du client
      const guild = client.guilds.cache.get(process.env.GUILD_ID);
      if (!guild) {
        console.log('La guilde n\'a pas pu être récupérée à partir du cache du client.');
        return;
      }

      // ID du salon de logs (assure-toi de remplacer ceci par le vrai ID)
      const logChannelId = '993857352950366290';

      // Récupération du salon de logs
      const logChannel = guild.channels.cache.get(logChannelId);
      if (!logChannel) {
        console.log('Salon de log introuvable.');
        return;
      }

      // Crée un embed pour les modifications apportées au rôle
      const embed = new MessageEmbed()
        .setTitle('Modification de Rôle')
        .setDescription(`Le rôle a été modifié : ${oldRole.name}`)
        .setColor('#f1c40f') // Couleur jaune pour indiquer une modification
        .addFields(
          { name: '± ID du rôle', value: newRole.id, inline: true },
          { name: '± Nom (avant)', value: oldRole.name, inline: true },
          { name: '± Nom (après)', value: newRole.name, inline: true },
          { name: '± Couleur (avant)', value: oldRole.hexColor, inline: true },
          { name: '± Couleur (après)', value: newRole.hexColor, inline: true },
          { name: '± Permissions (avant)', value: oldRole.permissions.toArray().join(', ') || 'Aucune', inline: true },
          { name: '± Permissions (après)', value: newRole.permissions.toArray().join(', ') || 'Aucune', inline: true }
        )
        .setTimestamp();

      // Envoie de l'embed dans le salon de logs
      await logChannel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'envoi du message dans le salon de logs :', error);
    }
  }
};
