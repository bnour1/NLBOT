const { SlashCommandBuilder } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Limpa a playlist'),
    async execute(interaction) {
        const queue = Player.singleton().nodes.get(interaction.guild.id);
        queue.tracks.clear();
        return await interaction.reply({ content: "Playlist Limpa", ephemeral: true });
    },
};