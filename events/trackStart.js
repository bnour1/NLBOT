module.exports = {
	name: "trackStart",
	async execute(queue, track) {
		queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`);
	},
};