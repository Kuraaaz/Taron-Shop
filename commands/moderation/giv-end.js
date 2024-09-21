const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "givend",
  category: "utils",
  permissions: ["ADMINISTRATOR"],
  ownerOnly: false,
  usage: "giveaway end [messageId]",
  description: "Termine un giveaway en fonction de l'identifiant du message",
  options: [
    {
      name: "messageId",
      description: "L'identifiant du message du giveaway à terminer",
      type: "STRING",
      required: true,
    },
  ],
  async runInteraction(client, interaction) {
    const messageId = interaction.options.getString("messageId");
    const channel = interaction.channel;

    let giveawayMessage;
    try {
      giveawayMessage = await channel.messages.fetch(messageId);
    } catch (error) {
      return interaction.reply({ content: "Message non trouvé!", ephemeral: true });
    }

    const embed = giveawayMessage.embeds[0];
    if (!embed || !embed.title) {
      return interaction.reply({ content: "Ce message n'est pas un giveaway!", ephemeral: true });
    }

    const participants = giveawayMessage.interaction ? giveawayMessage.interaction.collector.users.cache.map(user => user.id) : [];

    if (participants.length === 0) {
      await giveawayMessage.reply("Le giveaway a été terminé, mais personne n'a participé.");
      await interaction.reply({ content: "Le giveaway a été terminé, mais aucun participant n'a été trouvé.", ephemeral: true });
      return;
    }

    const winnerId = participants[Math.floor(Math.random() * participants.length)];
    await interaction.reply({ content: `Félicitations à <@${winnerId}>! Le giveaway a été terminé.`, ephemeral: false });

    const endEmbed = new MessageEmbed()
      .setTitle(`${embed.title} - Giveaway Terminé`)
      .setDescription(`Félicitations à <@${winnerId}>! Vous avez gagné le giveaway!`)
      .setColor("#FF0000")
      .setTimestamp();

    await channel.send({ embeds: [endEmbed] });
  },
};
