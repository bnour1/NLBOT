const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears the queue'),
    async execute(interaction) {
        const guildQueue = interaction.client.player.getQueue(interaction.guild.id);
        guildQueue.clearQueue();
      },
    };