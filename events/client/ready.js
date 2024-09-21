const Logger = require("../../utils/Logger");

const moderatorRoleId = "992456669617475645";
const messageLimit = 6;
const banKickLimit = 4;
const messageTimeFrame = 4000;
const banKickTimeFrame = 300000;

const messageTracker = new Map();
const banKickTracker = new Map();


module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    Logger.client("- Prêt à être utilisé");

  let statues = [
        'Modère le serveur Taron Shop !',
        'Je suis Taron Bot, le bot de modération du serveur Taron Shop',
        'Pour connaitre mes commandes, tapez /help !',
        'Développé par @Kura !'
      ] 
      
      setInterval(function() {
        let status = statues[Math.floor(Math.random() * statues.length)];
        client.user.setActivity(status, { type: "PLAYING" })
      }, 10000)
      
    const devGuild = client.guilds.cache.get(process.env.GUILD_ID);
      devGuild.commands.set(client.commands.map((cmd) => cmd));
    const hasAdminPermissions = (member) => {
      return member.permissions.has('ADMINISTRATOR');
    };

    client.on('messageCreate', async (message) => {
      if (message.author.bot) return;

      const { author, guild } = message;
      const member = guild.members.cache.get(author.id);
      
      if (member && hasAdminPermissions(member)) return;

      if (!messageTracker.has(author.id)) {
        messageTracker.set(author.id, []);
      }

      const userMessages = messageTracker.get(author.id);
      const now = Date.now();

      userMessages.push(now);

      const recentMessages = userMessages.filter(timestamp => now - timestamp < messageTimeFrame);
      messageTracker.set(author.id, recentMessages);

      if (recentMessages.length > messageLimit) {
        if (member) {
          message.channel.bulkDelete(recentMessages.length, true).catch(console.error);
          member.kick("Anti-raid: Spamming messages").catch(console.error);
          messageTracker.delete(author.id);
        }
      }
    });

    client.on('guildMemberRemove', (member) => {
      const { executor } = member;
      if (!executor || executor.bot) return;

      const executorMember = member.guild.members.cache.get(executor.id);
      if (executorMember && hasAdminPermissions(executorMember)) return;

      if (!banKickTracker.has(executor.id)) {
        banKickTracker.set(executor.id, []);
      }

      const actions = banKickTracker.get(executor.id);
      const now = Date.now();

      actions.push(now);

      const recentActions = actions.filter(timestamp => now - timestamp < banKickTimeFrame);
      banKickTracker.set(executor.id, recentActions);

      if (recentActions.length > banKickLimit) {
        const guildMember = member.guild.members.cache.get(executor.id);
        if (guildMember && guildMember.roles.cache.has(moderatorRoleId)) {
          guildMember.roles.remove(moderatorRoleId, "Anti-raid: Abus d'expulsions/bannissements")
            .catch(console.error);
          banKickTracker.delete(executor.id);
        }
      }
    });
  }
};