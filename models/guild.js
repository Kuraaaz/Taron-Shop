const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  id: String,
  logChannel: { type: String, default: "1285800827617017926" },
  modChannel: { type: String, default: "1285800827617017926" },
  users: { type: [], default: [] },
  faq: { type: [], default: [] },
});

module.exports = mongoose.model("Guild", guildSchema);
