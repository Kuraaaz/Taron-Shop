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
      name: "descriptiontitle5",
      description: "Titre pour la quatrième description (facultatif)",
      type: "STRING",
      required: false,
    },
    {
      name: "description5",
      description: "Quatrième description (facultative, max 100 caractères)",
      type: "STRING",
      required: false,
    },
    {
      name: "descriptiontitle6",
      description: "Titre pour la quatrième description (facultatif)",
      type: "STRING",
      required: false,
    },
    {
      name: "description6",
      description: "Quatrième description (facultative, max 100 caractères)",
      type: "STRING",
      required: false,
    },
    {
      name: "descriptiontitle7",
      description: "Titre pour la quatrième description (facultatif)",
      type: "STRING",
      required: false,
    },
    {
      name: "description7",
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
    const descriptionTitle5 = interaction.options.getString("descriptiontitle5");
    const description5 = interaction.options.getString("description5");
    const descriptionTitle6 = interaction.options.getString("descriptiontitle6");
    const description6 = interaction.options.getString("description6");
    const descriptionTitle7 = interaction.options.getString("descriptiontitle7");
    const description7 = interaction.options.getString("description7");
    const imageUrl = interaction.options.getString("image");
    const thumbnailUrl = interaction.options.getString("thumbnail");

    const isValidHexColor = /^#[0-9A-F]{6}$/i.test(color);
    if (!isValidHexColor) {
      return interaction.reply({ content: "La couleur doit être un code hex valide (ex: #ff0000).", ephemeral: true });
    }

    if (description1.length > 100 || (description2 && description2.length > 100) || (description3 && description3.length > 100) || (description4 && description4.length > 100) || (description5 && description5.length > 100) || (description6 && description6.length > 100) || (description7 && description7.length > 100)) {
      return interaction.reply({ content: "Chaque description doit être de 100 caractères ou moins.", ephemeral: true });
    }

    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description1)
      .setColor(color);

    if (descriptionTitle2 && description2) embed.addField(descriptionTitle2, description2);
    if (descriptionTitle3 && description3) embed.addField(descriptionTitle3, description3);
    if (descriptionTitle4 && description4) embed.addField(descriptionTitle4, description4);
    if (descriptionTitle5 && description5) embed.addField(descriptionTitle5, description5);
    if (descriptionTitle6 && description6) embed.addField(descriptionTitle6, description6);
    if (descriptionTitle7 && description7) embed.addField(descriptionTitle7, description7);

    if (imageUrl) {
      embed.setImage(imageUrl);
    }

    if (thumbnailUrl) {
      embed.setThumbnail(thumbnailUrl);
    }

    await interaction.channel.send({ embeds: [embed] });

    await interaction.deleteReply();
  },
};