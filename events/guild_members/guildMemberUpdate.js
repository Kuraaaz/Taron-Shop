const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'guildMemberUpdate',
  once: false,
  async execute(client, oldMember, newMember) {
    const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));

    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

    const logChannelId = '993857352950366290';
    const logChannel = newMember.guild.channels.cache.get(logChannelId);
    
    if (!logChannel) {
      return console.log('Canal de log non trouvé.');
    }

    if (addedRoles.size > 0) {
      addedRoles.forEach(role => {
        const embed = new MessageEmbed()
          .setTitle('Rôle ajouté')
          .setColor('#00FF00')
          .setDescription(`Un rôle a été ajouté à **${newMember.user.tag}**`)
          .addField('Rôle ajouté', `${role.name} (${role.id})`, true)
          .addField('ID du membre', newMember.id, true)
          .setTimestamp()
          .setFooter({ text: 'Rôle ajouté', iconURL: newMember.user.displayAvatarURL() });

        logChannel.send({ embeds: [embed] });
      });
    }

    if (removedRoles.size > 0) {
      removedRoles.forEach(role => {
        const embed = new MessageEmbed()
          .setTitle('Rôle retiré')
          .setColor('#FF0000')
          .setDescription(`Un rôle a été retiré à **${newMember.user.tag}**`)
          .addField('Rôle retiré', `${role.name} (${role.id})`, true)
          .addField('ID du membre', newMember.id, true)
          .setTimestamp()
          .setFooter({ text: 'Rôle retiré', iconURL: newMember.user.displayAvatarURL() });

        logChannel.send({ embeds: [embed] });
      });
    }
  }
};
