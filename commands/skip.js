const { SlashCommandBuilder } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('pula para a proxima faixa'),
        async execute(interaction) {
            const queue = Player.singleton().nodes.get(interaction.guild.id);
            queue.node.skip();
        return await interaction.reply({ content: "Skipado", ephemeral: true });
    },
};