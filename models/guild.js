const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  id: String,
  logChannel: { type: String, default: "1286939470989492224" },
  modChannel: { type: String, default: "1286939470989492224" },
  users: { type: [], default: [] },
  faq: { type: [], default: [] },
});

module.exports = mongoose.model("Guild", guildSchema);
