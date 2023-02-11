const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Mostra o ping do bot no Discord'),
    async execute(message) {
        const m = message.channel.send("Pinging...");
        m.then((msg) => {
          const ping = Date.now() - msg.createdTimestamp;
          msg.edit(`O ping é de ${ping} ms seu seboso.`);
        });
      },
    };