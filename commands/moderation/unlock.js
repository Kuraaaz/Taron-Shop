const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unlock",
  category: "moderation",
  permissions: ["MANAGE_CHANNELS"],
  ownerOnly: false,
  usage: "unlock",
  examples: ["unlock"],
  description: "Permet de déverrouiller un salon.",
  async runInteraction(client, interaction, guildSettings) {
    await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: true });

    const originalName = interaction.channel.name;

    if (originalName.startsWith("🔒-")) {
      const newName = originalName.slice(2);
      await interaction.channel.setName(newName);
    }

    await interaction.reply({ content: "Le salon est déverrouillé !" });
  }
};
