const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
  name: 'userUpdate',
  once: false,
  async execute(oldUser, newUser) {
    try {
      const client = oldUser.client;
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

      const changes = [];
      if (oldUser.username !== newUser.username) {
        changes.push(`**Nom d'utilisateur :** \nAvant : ${oldUser.username}\nAprès : ${newUser.username}`);
      }
      if (oldUser.discriminator !== newUser.discriminator) {
        changes.push(`**Tag :** \nAvant : ${oldUser.discriminator}\nAprès : ${newUser.discriminator}`);
      }
      if (oldUser.avatar !== newUser.avatar) {
        changes.push(`**Photo de profil :** \nAvant : [Ancienne photo](${oldUser.displayAvatarURL({ dynamic: true })})\nAprès : [Nouvelle photo](${newUser.displayAvatarURL({ dynamic: true })})`);
      }
      if (oldUser.banner !== newUser.banner) {
        changes.push(`**Bannière :** \nAvant : [Ancienne bannière](https://cdn.discordapp.com/banners/${oldUser.id}/${oldUser.banner}.png)\nAprès : [Nouvelle bannière](https://cdn.discordapp.com/banners/${newUser.id}/${newUser.banner}.png)`);
      }

      if (changes.length === 0) {
        console.log('Aucun changement détecté.');
        return;
      }

      const embed = new MessageEmbed()
        .setTitle('Mise à Jour d\'Utilisateur')
        .setDescription(`Les informations de l'utilisateur ont été modifiées : ${newUser.tag}`)
        .setColor('#f39c12') // Couleur orange pour indiquer une modification
        .addFields(changes.map(change => ({ name: '\u200b', value: change })))
        .setTimestamp();

      await logChannel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'envoi du message dans le salon de logs :', error);
    }
  }
};