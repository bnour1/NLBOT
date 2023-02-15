const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('stops the queue'),
    async execute(interaction) {
        const guildQueue = interaction.client.player.getQueue(interaction.guild.id);
        guildQueue.stop();
      },
    };