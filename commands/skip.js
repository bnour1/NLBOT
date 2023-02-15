const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song playing'),
    async execute(interaction) {
        const guildQueue = interaction.client.player.getQueue(interaction.guild.id);
        guildQueue.skip();
      },
    };