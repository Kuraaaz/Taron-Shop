const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "vouch",
  category: "utils",
  permissions: ["SEND_MESSAGES"],
  ownerOnly: false,
  usage: "vouch [message] [image]",
  examples: ["vouch Super user! https://example.com/image.png"],
  description: "Envoyer un message vouch accompagné d'une image dans un embed",
  options: [
    {
      name: "message",
      description: "Le message de vouch",
      type: "STRING",
      required: true,
    },
    {
      name: "image",
      description: "Lien vers l'image à inclure",
      type: "STRING",
      required: true,
    },
  ],
  async runInteraction(client, interaction, guild) {
    const vouchMessage = interaction.options.getString("message", true);
    const imageUrl = interaction.options.getString("image", true);

    // Validation pour vérifier si l'image est un lien valide
    if (!imageUrl.startsWith("http")) {
      return interaction.reply({
        content: "L'URL de l'image fournie n'est pas valide. Assurez-vous qu'il s'agit d'un lien commençant par http ou https.",
        ephemeral: true,
      });
    }

    // Création de l'embed avec message et image
    const embed = new MessageEmbed()
      .setColor("#e801f0")
      .setTitle("Vouch")
      .setDescription(vouchMessage)
      .setImage(imageUrl)
      .setAuthor({
        name: `${interaction.member.displayName} (${interaction.member.id})`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setThumbnail(guild.iconURL)
      .setTimestamp();

    // Répondre à l'interaction avec l'embed
    await interaction.reply({ embeds: [embed] });
  },
};
