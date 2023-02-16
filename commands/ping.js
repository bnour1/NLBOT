const { SlashCommandBuilder } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Retorna o ping em milissegundos.'),

  async execute(interaction) {
    const start = Date.now();
    await interaction.reply('Seu ping é...');
    const end = Date.now();
    await interaction.editReply(`Latência do bot: ${end - start}ms`);
  },
};