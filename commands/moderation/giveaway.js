const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: "giveaway",
  category: "fun",
  permissions: ["ADMINISTRATOR"],
  ownerOnly: false,
  usage: "giveaway [title] [description] [duration]",
  examples: ["giveaway 'Super Giveaway' 'Gagne un prix!' '10m'"],
  description: "Crée un giveaway avec un titre, une description et une durée",
  options: [
    {
      name: "title",
      description: "Le titre du giveaway",
      type: "STRING",
      required: true,
    },
    {
      name: "description",
      description: "La description du giveaway",
      type: "STRING",
      required: true,
    },
    {
      name: "duration",
      description: "La durée du giveaway",
      type: "STRING",
      required: true,
    },
  ],
  async runInteraction(client, interaction, guildSettings) {
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const duration = interaction.options.getString("duration");

    // Vérifiez si la durée est valide
    if (!duration || typeof duration !== 'string' || duration.trim() === '') {
      return interaction.reply({ content: "Veuillez spécifier une durée valide!", ephemeral: true });
    }

    const convertedTime = ms(duration);
    if (!convertedTime || convertedTime <= 0) {
      return interaction.reply({ content: "Spécifier une durée valide!", ephemeral: true });
    }

    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor("c806d6")
      .setFooter({ text: `Fin du giveaway dans ${ms(convertedTime, { long: true })}` })
      .setTimestamp();

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('giveaway-participate')
          .setLabel('Participer')
          .setStyle('SUCCESS'),
        new MessageButton()
          .setCustomId('giveaway-view')
          .setLabel('Voir les participants')
          .setStyle('PRIMARY')
      );

    const message = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });
    const participants = [];

    const collector = message.createMessageComponentCollector({
      componentType: 'BUTTON',
      time: convertedTime,
    });

    collector.on('collect', async (buttonInteraction) => {
      if (buttonInteraction.replied || buttonInteraction.deferred) return;

      if (buttonInteraction.customId === 'giveaway-participate') {
        if (!participants.includes(buttonInteraction.user.id)) {
          participants.push(buttonInteraction.user.id);
          await buttonInteraction.reply({ content: "Vous avez été ajouté au giveaway!", ephemeral: true });
        } else {
          await buttonInteraction.reply({ content: "Vous participez déjà au giveaway!", ephemeral: true });
        }
      } else if (buttonInteraction.customId === 'giveaway-view') {
        const participantsList = participants.length > 0 
          ? participants.map(id => `<@${id}>`).join('\n')
          : "Aucun participant pour l'instant.";
        await buttonInteraction.reply({ content: `Participants:\n${participantsList}`, ephemeral: true });
      }
    });

    collector.on('collect', async (buttonInteraction) => {
        if (buttonInteraction.replied || buttonInteraction.deferred) return;
      
        if (buttonInteraction.customId === 'giveaway-participate') {
          if (!participants.includes(buttonInteraction.user.id)) {
            participants.push(buttonInteraction.user.id);
            await buttonInteraction.reply({ content: "Vous avez été ajouté au giveaway!", ephemeral: true });
          } else {
            await buttonInteraction.reply({ content: "Vous participez déjà au giveaway!", ephemeral: true });
          }
        } else if (buttonInteraction.customId === 'giveaway-view') {
          const participantsList = participants.length > 0 
            ? participants.map(id => `<@${id}>`).join('\n')
            : "Aucun participant pour l'instant.";
          await buttonInteraction.reply({ content: `Participants:\n${participantsList}`, ephemeral: true });
        }
      });
      
      collector.on('end', async () => {
        if (participants.length === 0) {
          await interaction.followUp({ content: "Personne n'a participé au giveaway.", components: [] });
          return;
        }
      
        const winnerId = participants[Math.floor(Math.random() * participants.length)];
        await interaction.followUp({ content: `Félicitations à <@${winnerId}>! Tu as gagné le giveaway! ``${description}```, components: [] });
      });           
  },
};