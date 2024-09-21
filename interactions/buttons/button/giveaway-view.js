const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "giveaway-view",
  async runInteraction(client, interaction) {
    if (interaction.replied || interaction.deferred) return;

    await interaction.deferReply({ ephemeral: true });

    const participants = interaction.client.giveaways[interaction.message.id] || [];

    const participantsList = participants.length > 0 
      ? participants.map(id => `<@${id}>`).join('\n')
      : "Aucun participant pour l'instant.";

    await interaction.editReply({ content: `Participants:\n${participantsList}` });
  },
};
