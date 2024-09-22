const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "embed",
  category: "moderation",
  permissions: ["ADMINISTRATOR"],
  ownerOnly: false,
  usage: "embed [title] [description] [color] [image] [thumbnail] [descriptionTitle2] [description2] [descriptionTitle3] [description3]",
  examples: ["embed 'Mon titre' 'Description ici' '#ff0000' 'http://image.url' 'http://thumbnail.url' 'Titre 2' 'Description 2' 'Titre 3' 'Description 3'"],
  description: "Crée un embed avec un titre, des descriptions, couleur, et optionnellement une image ou miniature",
  options: [
    {
      name: "title",
      description: "Titre de l'embed",
      type: "STRING",
      required: true,
    },
    {
      name: "description1",
      description: "Première description de l'embed (obligatoire, max 100 caractères)",
      type: "STRING",
      required: true,
    },
    {
      name: "color",
      description: "Couleur hex (ex: #ff0000)",
      type: "STRING",
      required: true,
    },
    {
      name: "descriptiontitle2",
      description: "Titre pour la deuxième description (facultatif)",
      type: "STRING",
      required: false,
    },
    {
      name: "description2",
      description: "Deuxième description (facultative, max 100 caractères)",
      type: "STRING",
      required: false,
    },
    {
      name: "descriptiontitle3",
      description: "Titre pour la troisième description (facultatif)",
      type: "STRING",
      required: false,
    },
    {
      name: "description3",
      description: "Troisième description (facultative, max 100 caractères)",
      type: "STRING",
      required: false,
    },
    {
      name: "descriptiontitle4",
      description: "Titre pour la quatrième description (facultatif)",
      type: "STRING",
      required: false,
    },
    {
      name: "description4",
      description: "Quatrième description (facultative, max 100 caractères)",
      type: "STRING",
      required: false,
    },
    {
      name: "image",
      description: "URL de l'image",
      type: "STRING",
      required: false,
    },
    {
      name: "thumbnail",
      description: "URL du thumbnail",
      type: "STRING",
      required: false,
    },
  ],
  async runInteraction(client, interaction) {
    const title = interaction.options.getString("title");
    const description1 = interaction.options.getString("description1");
    const color = interaction.options.getString("color");
    const descriptionTitle2 = interaction.options.getString("descriptiontitle2");
    const description2 = interaction.options.getString("description2");
    const descriptionTitle3 = interaction.options.getString("descriptiontitle3");
    const description3 = interaction.options.getString("description3");
    const descriptionTitle4 = interaction.options.getString("descriptiontitle4");
    const description4 = interaction.options.getString("description4");
    const imageUrl = interaction.options.getString("image");
    const thumbnailUrl = interaction.options.getString("thumbnail");

    // Validation de la couleur hexadécimale
    const isValidHexColor = /^#[0-9A-F]{6}$/i.test(color);
    if (!isValidHexColor) {
      return interaction.reply({ content: "La couleur doit être un code hex valide (ex: #ff0000).", ephemeral: true });
    }

    // Validation des longueurs de descriptions (max 100 caractères)
    if (description1.length > 100 || (description2 && description2.length > 100) || (description3 && description3.length > 100) || (description4 && description4.length > 100)) {
      return interaction.reply({ content: "Chaque description doit être de 100 caractères ou moins.", ephemeral: true });
    }

    // Création de l'embed
    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description1) // Première description obligatoire
      .setColor(color);

    // Ajout facultatif de descriptions supplémentaires avec leurs titres
    if (descriptionTitle2 && description2) embed.addField(descriptionTitle2, description2);
    if (descriptionTitle3 && description3) embed.addField(descriptionTitle3, description3);
    if (descriptionTitle4 && description4) embed.addField(descriptionTitle4, description4);

    // Ajout facultatif de l'image
    if (imageUrl) {
      embed.setImage(imageUrl);
    }

    // Ajout facultatif du thumbnail
    if (thumbnailUrl) {
      embed.setThumbnail(thumbnailUrl);
    }

    // Envoi de l'embed
    await interaction.channel.send({ embeds: [embed] });

    // Supprime le message d'appel de la commande
    await interaction.deleteReply();
  },
};