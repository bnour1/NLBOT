const { SlashCommandBuilder } = require('discord.js');
const playdl = require("play-dl");
const ytdlcore = require("ytdl-core")
const { Player } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Inicia musica')
        .addStringOption(option =>
            option.setName("query")
                .setDescription('The refferal to the song')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
        const query = interaction.options.getString("query");
        const queue = interaction.client.player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            },
            async onBeforeCreateStream(track, source, _queue) {
                    return (await playdl.stream(track.url, { discordPlayerCompatibility : true })).stream;
            }
        });
        
        // verify vc connection
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
        }

        await interaction.deferReply();
        const track = await interaction.client.player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** não encontrada`, ephemeral:true});

        queue.play(track);

        return await interaction.followUp({ content: `⏱️ | Adicionando **${track.title}** à playlist!`, ephemeral: true });
    },
};