const { MessageEmbed } = require("discord.js");
const ownerId = '1046834138583412856'

module.exports = {
  name: "exit",
  category: "moderation",
  permissions: ["ADMINISTRATOR"],
  ownerOnly: true,
  usage: "exit",
  examples: ["exit"],
  description: "Permet d'arrêter le bot.",
  async runInteraction(client, interaction, guildSettings) {
    if (interaction.user.id !== ownerId) {
      return interaction.reply({
        content: "Vous n'avez pas la permission d'arrêter le bot.",
        ephemeral: true,
      });
    }
    client.user.setPresence({
      activities: [{ name: "", type: "WATCHING" }],
      status: "offline",
})

    await interaction.reply({
      content: "Mise en arrêt du bot.",
      ephemeral: true,
    });

    await client.destroy();

    process.exit(0);
  },
};
