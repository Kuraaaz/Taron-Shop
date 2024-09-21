module.exports = {
  name: "giveaway-participate",
  async runInteraction(client, interaction) {
    // Utilisation de deferReply pour donner plus de temps au traitement
    await interaction.reply({ ephemeral: true });
  },
};
