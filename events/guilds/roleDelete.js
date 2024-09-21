const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
  name: 'roleDelete',
  once: false,
  async execute(client, role) {
    try {
      // Assure-toi que le client est disponible
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

      // Création de l'embed
      const embed = new MessageEmbed()
        .setTitle('Rôle Supprimé')
        .setDescription(`Un rôle a été supprimé : ${role.name}`)
        .setColor('#e74c3c') // Couleur rouge pour indiquer une suppression
        .addFields(
          { name: '± Nom du rôle', value: role.name, inline: true },
          { name: '± ID du rôle', value: role.id, inline: true },
          { name: '± Couleur du rôle', value: role.color, inline: true }
        )
        .setTimestamp();

      // Envoie de l'embed dans le salon de logs
      await logChannel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'envoi du message dans le salon de logs :', error);
    }
  }
};