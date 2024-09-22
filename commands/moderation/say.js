module.exports = {
  name: "say",
  category: "moderation",
  permissions: ["ADMINISTRATOR"],
  ownerOnly: false,
  usage: "say [message]",
  examples: ["say 'Ceci est un message répété'"],
  description: "Répète le message donné en argument et supprime le message d'appel.",
  options: [
    {
      name: "message",
      description: "Le message à répéter",
      type: "STRING",
      required: true,
    },
  ],
  async runInteraction(client, interaction) {
    const message = interaction.options.getString("message");

    // Envoie le message dans le salon
    await interaction.channel.send(message);

    // Supprime le message d'appel de la commande
    await interaction.deleteReply();
  },
};