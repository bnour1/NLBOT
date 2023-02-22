const { Player } = require('discord-music-player');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'songFirst',
	once: false,
	 execute(queue, song) {
		const songEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Tocando agora '+queue.nowPlaying)
        .setURL(song.url)
        .setThumbnail(song.thumbnail)
        queue.data.channel.send({ embeds: [songEmbed] });
	},
};