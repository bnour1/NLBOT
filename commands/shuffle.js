const { SlashCommandBuilder } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('randomiza a ordem na playlist'),
    async execute(interaction) {
        const queue = Player.singleton().nodes.get(interaction.guild.id);
        queue.tracks.shuffle();
        return await interaction.reply({ content: "Ordem randomizada", ephemeral: true });
    },
};