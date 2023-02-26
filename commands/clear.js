const { SlashCommandBuilder } = require('discord.js');
const playdl = require("play-dl");
const { Player } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Inicia musica')
        .addStringOption(option =>
            option.setName("query")
                .setDescription('The refferal to the song')
                .setRequired(true)),
    async execute(interaction) {
        interaction.client.player.getQueue(interaction.guild.id).destroy();
        return await interaction.reply({ content: "Playlist Limpa", ephemeral: true });
    },
};