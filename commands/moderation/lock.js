const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "lock",
  category: "moderation",
  permissions: ["MANAGE_CHANNELS"],
  ownerOnly: false,
  usage: "lock",
  examples: ["lock"],
  description: "Permet d'interdire l'envoi de messages dans un salon.",
  async runInteraction(client, interaction, guildSettings) {
    await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: false });

    const originalName = interaction.channel.name;

    if (!originalName.startsWith("🔒")) {
      await interaction.channel.setName(`🔒-${originalName}`);
    }

    await interaction.reply({ content: "Le salon est verrouillé !" });
  }
};
