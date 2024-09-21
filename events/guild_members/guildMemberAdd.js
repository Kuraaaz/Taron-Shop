const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  once: false,
  async execute(client, member) {
    const fetchGuild = await client.getGuild(member.guild);

    const autoRoleId = "992895701740703785";

    try {
      const role = member.guild.roles.cache.get(autoRoleId);
      if (role) {
        await member.roles.add(role);
        console.log(`Rôle attribué à ${member.user.tag}`);
      } else {
        console.log("Le rôle spécifié n'a pas été trouvé.");
      }
    } catch (error) {
      console.error(`Erreur lors de l'attribution du rôle à ${member.user.tag}:`, error);
    }

    // Embedding pour l'affichage dans le canal de log
    const embed = new MessageEmbed()
      .setAuthor({
        name: `${member.user.tag} (${member.id})`,
        iconURL: member.user.displayAvatarURL(),
      })
      .setColor("#21ff81")
      .setDescription(
        `± Nom d'utilisateur: ${member}
± Créé le: <t:${parseInt(
    member.user.createdTimestamp / 1000
  )}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
± Rejoint le: <t:${parseInt(
    member.joinedTimestamp / 1000
  )}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
`
      )
      .setTimestamp()
      .setFooter({ text: "L'utilisateur a rejoint !" });

    const logChannel = client.channels.cache.get(fetchGuild.logChannel);
    if (logChannel) {
      logChannel.send({ embeds: [embed] });
    } else {
      console.log("Le canal de log n'a pas été trouvé.");
    }
  },
};