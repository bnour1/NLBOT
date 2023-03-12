const { SlashCommandBuilder } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('pausa a musica atual'),
    async execute(interaction) {
        const queue = Player.singleton().nodes.get(interaction.guild.id);
        queue.tracks.pause();
        return await interaction.reply({ content: "Playlist Limpa", ephemeral: true });
    },
};