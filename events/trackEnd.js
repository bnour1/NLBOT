const { PlayerEvents } = require('discord-player');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'trackEnd',
	once: false,
	 execute(queue, track) {
		const songEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Tocando agora '+track.title)
        .setURL(track.url)
        .setThumbnail(track.thumbnail)
        queue.metadata.channel.send({ embeds: [songEmbed] });
	},
};