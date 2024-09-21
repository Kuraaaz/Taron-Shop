module.exports = {
  name: "threadCreate",
  once: false,
  async execute(thread) {
    if (thread.isText()) thread.join();
  },
};
