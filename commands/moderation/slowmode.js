const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "slowmode",
  category: "moderation",
  permissions: ["MANAGE_CHANNELS"],
  ownerOnly: false,
  usage: "slowmode <duration>",
  examples: ["slowmode 10", "slowmode 0"],
  description: "Définit un délai de slowmode pour le salon actuel en secondes.",
  options: [
    {
      name: "duration",
      description: "Durée du slowmode en secondes (0 pour désactiver)",
      type: "INTEGER",
      required: true,
    }
  ],
  async runInteraction(client, interaction, guildSettings) {
    const duration = interaction.options.getInteger("duration");

    if (duration < 0) {
      return interaction.reply({ content: "La durée doit être un nombre positif.", ephemeral: true });
    }

    try {
      await interaction.channel.setRateLimitPerUser(duration);

      if (duration === 0) {
        await interaction.reply({ content: "Le slowmode a été désactivé pour ce salon !" });
      } else {
        await interaction.reply({ content: `Le slowmode a été défini à ${duration} secondes pour ce salon !` });
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "Une erreur s'est produite lors de la tentative de définition du slowmode.", ephemeral: true });
    }
  }
};
